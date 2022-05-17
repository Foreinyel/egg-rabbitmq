"use strict";

const assert = require("assert");
const createConnection = require("./conn");
const { MESSAGE_PRODUCER, MESSAGE_CONSUMER } = require("./consts");

const loadConsumer = async (app, conn) => {
  const queues = app.config.rabbitmq.queues.filter((item) => item.consume);
  if (queues && queues.length > 0) {
    for (let q of queues) {
      const { exchange, exchangeOption, queue, queueOption, consumerOption } =
        q;
      if (exchange) {
        const ch = await conn.createChannel();
        const { type: exchangeType, ...restExchangeOption } = exchangeOption;
        await ch.assertExchange(exchange, exchangeType, restExchangeOption);
        await ch.assertQueue(queue, queueOption);
        await ch.consume(
          queue,
          (msg) => {
            let content = msg.content.toString();
            try {
              content = JSON.parse(content);
            } catch {}
            app.messenger.sendRandom(
              MESSAGE_CONSUMER,
              JSON.stringify({
                queue,
                content,
              })
            );
          },
          Object.assign({}, { noAck: true }, consumerOption)
        );
      } else {
        const ch = await conn.createChannel();
        await ch.assertQueue(queue, queueOption);
        await ch.consume(
          queue,
          (msg) => {
            let content = msg.content.toString();
            try {
              content = JSON.parse(content);
            } catch {}
            app.messenger.sendRandom(
              MESSAGE_CONSUMER,
              JSON.stringify({
                queue,
                content,
              })
            );
          },
          Object.assign({}, { noAck: true }, consumerOption)
        );
      }
    }
  }
};

const loadProducer = async (app, conn) => {
  app.messenger.on(MESSAGE_PRODUCER, async (msg) => {
    const data = JSON.parse(msg);
    const { dest, content } = data;
    const queueInfo = app.config.rabbitmq.queues.find(
      (q) => (q.queue === dest || q.exchange === dest) && q.produce
    );
    if (queueInfo) {
      if (queueInfo.exchange) {
        const ch = await conn.createChannel();
        const {
          type: exchangeType,
          routingKey,
          ...restExchangeOption
        } = queueInfo.exchangeOption;
        await ch.assertExchange(
          queueInfo.exchange,
          exchangeType,
          restExchangeOption
        );
        ch.publish(
          queueInfo.exchange,
          routingKey,
          Buffer.from(
            typeof content === "string" ? content : JSON.stringify(content)
          )
        );
        await ch.close();
      } else {
        const ch = await conn.createChannel();
        await ch.assertQueue(dest, queueInfo.queueOption);
        await ch.sendToQueue(
          dest,
          Buffer.from(
            typeof content === "string" ? content : JSON.stringify(content)
          )
        );
      }
    }
  });
};

module.exports = async (app) => {
  assert(
    app.config.rabbitmq &&
      app.config.rabbitmq.address &&
      app.config.rabbitmq.queues,
    "Invalid configuration for rabbitmq"
  );
  const conn = await createConnection(app);
  await loadConsumer(app, conn);
  await loadProducer(app, conn);
  return conn;
};

"use strict";

exports.keys = "123456";

exports.rabbitmq = {
  address: "amqp://localhost:5672",
  queues: [
    {
      queue: "log1",
      queueOption: {
        durable: true,
      },
      exchange: "logs",
      exchangeOption: {
        type: "fanout",
        durable: true,
      },
      consumer: "",
      consumerOption: {
        noAck: true,
      },
      consume: true,
    },
    {
      queue: "log2",
      queueOption: {
        durable: true,
      },
      exchange: "logs",
      exchangeOption: {
        type: "fanout",
        durable: true,
      },
      consumer: "",
      consumerOption: { noAck: true },
      consume: true,
    },
    {
      queue: "log3",
      queueOption: {
        durable: true,
      },
      consumerOption: { noAck: true },
      produce: true,
    },
  ],
};

"use strict";

const { MESSAGE_CONSUMER, MESSAGE_PRODUCER } = require("./consts");
const loadConsumer = require("./loadConsumer");

module.exports = async function (app) {
  const rabbitmq = {
    send: (dest, content) => {
      app.messenger.sendToAgent(
        MESSAGE_PRODUCER,
        JSON.stringify({
          dest,
          content,
        })
      );
    },
  };

  Object.defineProperty(app, "rabbitmq", {
    get() {
      return rabbitmq;
    },
  });
  Object.defineProperty(app.context, "rabbitmq", {
    get() {
      return rabbitmq;
    },
  });

  const consumers = await loadConsumer(app);

  app.messenger.on(MESSAGE_CONSUMER, async (msg) => {
    const { queue, content } = JSON.parse(msg);

    const consumer = consumers.get(queue);
    if (typeof consumer === "function") {
      const ctx = app.createAnonymousContext();
      await consumer(ctx, content);
    }
  });
};

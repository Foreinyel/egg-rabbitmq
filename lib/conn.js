"use strict";

const rabbitmq = require("amqplib");
const assert = require("assert");

const createConnection = (() => {
  let conn = null;

  return async (options) => {
    assert(
      options || conn,
      "Invalid options for creating rabbitmq connection."
    );

    if (conn === null) {
      conn = await rabbitmq.connect(options.address || "amqp://localhost:5672");
    }
    return conn;
  };
})();

module.exports = async (app) => {
  return await createConnection(app ? app.config.rabbitmq || {} : undefined);
};

"use strict";

const path = require("path");
const _ = require("@hemyn/utils-node");

module.exports = async function (app) {
  const consumerPath = path.join(app.config.baseDir, "app/consumer");
  const fileList = await _.listFiles(consumerPath);
  const consumerMap = new Map();
  for (let file of fileList) {
    if (file.endsWith(".js")) {
      // const fileBasename = path.basename(file);
      // const queue = fileBasename.split(".")[0];
      const queue = path.parse(file).name;
      const consumer = require(file);
      consumerMap.set(
        queue,
        "default" in consumer ? consumer.default : consumer
      );
    }
  }
  return consumerMap;
};

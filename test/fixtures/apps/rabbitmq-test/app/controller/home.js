"use strict";

const Controller = require("egg").Controller;

const wait = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

class HomeController extends Controller {
  async index() {
    this.ctx.rabbitmq.send("log3", {
      v: 3,
    });
    await wait(10000);
    this.ctx.body = "hi, " + this.app.plugins.rabbitmq.name;
  }
}

module.exports = HomeController;

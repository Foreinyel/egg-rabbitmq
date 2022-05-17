"use strict";

const bootstrap = require("./lib/bootstrapAgent");
const close = require("./lib/close");

module.exports = class AgentBootHook {
  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {
    await bootstrap(this.app);
  }

  async beforeClose() {
    // 请将您的 app.beforeClose 中的代码置于此处。
    await close();
  }
};

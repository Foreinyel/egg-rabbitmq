"use strict";

const bootstrap = require("./lib/bootstrapApp");

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    await bootstrap(this.app);
  }
};

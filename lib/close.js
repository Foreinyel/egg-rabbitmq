"use strict";

const getConnection = require("./conn");

module.exports = async () => {
  const conn = await getConnection();
  await conn.close();
};

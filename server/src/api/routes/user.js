const express = require("express");

const route = express.Router();

module.exports = (app) => {
  app.use("/users", route);
};

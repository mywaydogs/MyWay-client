const config = require("./config");
const express = require("express");
const loaders = require("./loaders");

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });
  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
}

startServer();

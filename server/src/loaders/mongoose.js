const mongoose = require("mongoose");
const config = require("../config");

module.exports = async () => {
  try {
    const connection = await mongoose.connect(config.databaseURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    // we're connected!
    console.log("connected to db!");
  });
  return db;
};

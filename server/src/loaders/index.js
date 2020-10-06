const expressLoader = require("./express");
const mongooseLoader = require("./mongoose.js");

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log("MongoDB Intialized");
  await expressLoader({ app: expressApp });
  console.log("Express Intialized");

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
};

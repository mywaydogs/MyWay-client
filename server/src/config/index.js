process.env.NODE_ENV = process.env.NODE_ENV || "developnent";

module.exports = {
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET,
};

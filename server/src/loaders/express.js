const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const routes = require("../api");
const User = require("../models/user");

module.exports = async ({ app }) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
          if (err) {
            return done(err);
          }
          const errorMessage = { message: "Incorrect username/password." };
          if (!user) {
            return done(null, false, errorMessage);
          }
          user.comparePassword(password, function (err, isMatch) {
            if (err) {
              return done(err);
            }
            if (!isMatch) {
              done(null, false, errorMessage);
            }
            return done(null, user);
          });
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  var sess = {
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  };

  // if (process.env.NODE_ENV == 'production') {
  //     sess.cookie.secure = true;
  // }

  app.use(express.static(path.join(__dirname, "../client/build")));
  app.use(cors());
  app.use(session(sess));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes());
};

const express = require("express");
const passport = require("passport");

const route = express.Router();

module.exports = async (app) => {
  app.use("/auth", route);

  route.post("/login", passport.authenticate("local"), function (req, res) {
    res.status(200).json({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  });

  route.get("/logout", function (req, res) {
    req.logout();
    res.sendStatus(200);
  });

  route.get("/authenticate", function (req, res) {
    if (!req.user) {
      return res.sendStatus(401);
    }
    res.status(200).json({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  });

  route.post("/register", async function (req, res) {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName
    ) {
      return res
        .status(400)
        .send(
          "Request should contain the following fields: email, password, firstName, lastName"
        );
    }

    const { email, password, firstName, lastName } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).send("This email address is already taken");
      }

      const newUser = await new User({
        email,
        password,
        firstName,
        lastName,
      }).save();
      req.login(newUser, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("An unknown error has occured");
        } else {
          return res.status(200).json({
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
          });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("An unknown error has occured");
    }
  });
};

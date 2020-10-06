const express = require("express");
const Customer = require("../../models/customer");

const route = express.Router();

module.exports = (app) => {
  app.use("/customers", route);

  route.get("/", function (req, res) {
    if (!req.user) {
      return res.sendStatus(401);
    }
    Customer.aggregate()
      .match({ user: req.user._id })
      .lookup({
        from: "projects",
        localField: "_id",
        foreignField: "customer",
        as: "projects",
      })
      .project(
        "_id firstName lastName email phone address createdAt projects._id projects.name"
      )
      .then((customers) => res.json(customers));
  });

  route.post("/", function (req, res) {
    Customer.create({
      user: req.user._id,
      createdAt: new Date(),
      ...req.body,
    }).then((doc) => res.sendStatus(200));
  });

  route.put("/:id", function (req, res) {
    Customer.updateOne({ _id: req.params.id }, req.body)
      .then((doc) => res.sendStatus(200))
      .catch((err) => console.error(err));
  });

  route.delete("/:id", function (req, res) {
    Customer.findByIdAndDelete(req.params.id)
      .then((customer) => Project.deleteMany({ customer: customer._id }))
      .then((err) => res.sendStatus(200));
  });
};

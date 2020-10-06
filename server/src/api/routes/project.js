const express = require("express");
const Project = require("../../models/project");

const route = express.Router();

module.exports = (app) => {
  app.use("/projects", route);

  route.get("/:id", function (req, res) {
    Project.findById(req.params.id)
      .populate("customer")
      .then((project) => res.json(project));
  });

  route.post("/", function (req, res) {
    Project.create(req.body).then((doc) =>
      res.status(201).set("Location", `/api/projects/${doc._id}`).end()
    );
  });

  route.put("/:id", function (req, res) {
    Project.updateOne({ _id: req.params.id }, req.body)
      .then((doc) => res.sendStatus(200))
      .catch((err) => console.error(err));
  });
};

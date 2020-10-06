const express = require("express");
const auth = require("./routes/auth");
const user = require("./routes/user");
const customer = require("./routes/customer");
const project = require("./routes/project");

const User = require("../models/user");
const Customer = require("../models/customer");
const Project = require("../models/project");

module.exports = () => {
  const app = express.Router();
  auth(app);
  user(app);
  customer(app);
  project(app);

  app.get("/initdb", function (req, res) {
    console.log("re-initializing db");

    User.deleteMany({}, function (err) {});
    Customer.deleteMany({}, function (err) {});
    Project.deleteMany({}, function (err) {});

    new User({
      email: "kfir@zvi.com",
      password: "123",
      firstName: "כפיר",
      lastName: "צבי",
    })
      .save()
      .then((user) => {
        return Customer.create(
          [
            {
              firstName: "שמחה",
              lastName: "גורה",
              email: "simha@gora.com",
              phone: "0501231234",
              address: "זהירות בדרכים 34/5, חגור",
              createdAt: new Date(2020, 8, 5),
            },
          ].map((customer) => ({ ...customer, user: user._id }))
        );
      })
      .then((customers) => {
        Project.create([
          {
            customer: customers[0]._id,
            name: "מאווי",
            preliminaryDiagnosis: {
              diagnosis: "כלב מפלצת",
              accessories: "בובות מפוחלצות של סנאים",
              environmentalManagement: "גדר שיותר גבוהה ממה שהוא יכול לקפוץ",
              summary: "מותק של כלב",
            },
            notes: [],
            goals: [
              {
                title: "פקודת שב",
                description: "להצליח לגרום לכלב לשבת בפקודה",
                tasks: [
                  {
                    title: "משימה #1",
                    completed: false,
                    startTime: new Date(2020, 8, 22),
                    endTime: new Date(
                      new Date(2020, 8, 22).getTime() + 5 * 24 * 60 * 60 * 1000
                    ),
                  },
                  {
                    title: "משימה #2",
                    completed: true,
                    startTime: new Date(2020, 8, 22),
                    endTime: new Date(
                      new Date(2020, 8, 22).getTime() + 5 * 24 * 60 * 60 * 1000
                    ),
                  },
                  {
                    title: "משימה #3",
                    completed: false,
                    startTime: new Date(2020, 8, 22),
                    endTime: new Date(
                      new Date(2020, 8, 22).getTime() + 5 * 24 * 60 * 60 * 1000
                    ),
                  },
                ],
              },
              {
                title: "הרגלה לצרכים",
                description: "להצליח לגרום לכלב לעשות צרכים רק מחוץ לבית",
                tasks: [
                  {
                    title: "משימה #1",
                    completed: false,
                    startTime: new Date(2020, 8, 25),
                    endTime: new Date(
                      new Date(2020, 8, 25).getTime() + 3 * 24 * 60 * 60 * 1000
                    ),
                  },
                  {
                    title: "משימה #2",
                    completed: true,
                    startTime: new Date(2020, 8, 25),
                    endTime: new Date(
                      new Date(2020, 8, 25).getTime() + 3 * 24 * 60 * 60 * 1000
                    ),
                  },
                ],
              },
              {
                title: "הרגלה לצרכים",
                description: "להצליח לגרום לכלב לעשות צרכים רק מחוץ לבית",
                tasks: [
                  {
                    title: "משימה #1",
                    completed: false,
                    startTime: new Date(2020, 11, 25),
                    endTime: new Date(
                      new Date(2020, 11, 25).getTime() + 3 * 24 * 60 * 60 * 1000
                    ),
                  },
                  {
                    title: "משימה #2",
                    completed: true,
                    startTime: new Date(2020, 11, 25),
                    endTime: new Date(
                      new Date(2020, 11, 25).getTime() + 3 * 24 * 60 * 60 * 1000
                    ),
                  },
                  {
                    title: "משימה #3",
                    completed: false,
                    startTime: new Date(2020, 11, 25),
                    endTime: new Date(
                      new Date(2020, 11, 25).getTime() + 3 * 24 * 60 * 60 * 1000
                    ),
                  },
                ],
              },
            ],
          },
        ]);
      })
      .then(() => {
        res.sendStatus(200);
      });
  });

  return app;
};

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

mongoose.connect("mongodb://127.0.0.1:27017/customers-tracker", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected to db!");
});

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const customerSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

const projectSchema = mongoose.Schema({
  name: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  preliminaryDiagnosis: {
    diagnosis: { type: String, default: "" },
    accessories: { type: String, default: "" },
    environmentalManagement: { type: String, default: "" },
    summary: { type: String, default: "" },
  },
  notes: {
    type: [
      {
        creationTime: { type: Date },
        description: { type: String },
      },
    ],
    default: [],
  },
  goals: {
    type: [
      {
        title: { type: String },
        description: { type: String },
        tasks: [
          {
            title: { type: String },
            completed: { type: Boolean },
            startTime: { type: Date },
            endTime: { type: Date },
          },
        ],
      },
    ],
    default: [],
  },
});

const Project = mongoose.model("Project", projectSchema);

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
        if (!user || user.password !== password) {
          return done(null, false, { message: "Incorrect username/password." });
        }
        return done(null, user);
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

const app = express();

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

app.get("/initdb", function (req, res) {
  console.log("re-initializing db");

  User.deleteMany({}, function (err) {});
  Customer.deleteMany({}, function (err) {});
  Project.deleteMany({}, function (err) {});

  User.create({
    email: "kfir@zvi.com",
    password: "123",
    firstName: "כפיר",
    lastName: "צבי",
  })
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

app.get("/api/customers", function (req, res) {
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

app.post("/api/customers", function (req, res) {
  Customer.create({
    user: req.user._id,
    createdAt: new Date(),
    ...req.body,
  }).then((doc) => res.sendStatus(200));
});

app.put("/api/customers/:id", function (req, res) {
  Customer.updateOne({ _id: req.params.id }, req.body)
    .then((doc) => res.sendStatus(200))
    .catch((err) => console.error(err));
});

app.delete("/api/customers/:id", function (req, res) {
  Customer.findByIdAndDelete(req.params.id)
    .then((customer) => Project.deleteMany({ customer: customer._id }))
    .then((err) => res.sendStatus(200));
});

app.get("/api/projects/:id", function (req, res) {
  Project.findById(req.params.id)
    .populate("customer")
    .then((project) => res.json(project));
});

app.post("/api/projects", function (req, res) {
  Project.create(req.body).then((doc) =>
    res.status(201).set("Location", `/api/projects/${doc._id}`).end()
  );
});

app.put("/api/projects/:id", function (req, res) {
  Project.updateOne({ _id: req.params.id }, req.body)
    .then((doc) => res.sendStatus(200))
    .catch((err) => console.error(err));
});

app.post("/api/auth/register", async function (req, res) {
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

app.post("/api/auth/login", passport.authenticate("local"), function (
  req,
  res
) {
  res.status(200).json({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  });
});

app.get("/api/auth/logout", function (req, res) {
  req.logout();
  res.sendStatus(200);
});

app.get("/api/auth/authenticate", function (req, res) {
  if (!req.user) {
    return res.sendStatus(401);
  }
  res.status(200).json({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  });
});

const port = 3001 || process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

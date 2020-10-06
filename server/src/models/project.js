const mongoose = require("mongoose");

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

module.exports = Project;

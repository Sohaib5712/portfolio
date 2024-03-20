const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectType: String,
  projectUrl: String,
  images: [String], // Assuming you store image URLs
  sections: [
    {
      heading: String,
      detail: String,
    },
  ],
  keyPoints: [String],
  tools: [String],
});

module.exports = mongoose.model("Project", projectSchema);

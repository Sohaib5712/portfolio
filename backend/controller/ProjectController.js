// projectController.js
const Project = require("../model/ProjectSchema"); // Make sure to adjust the path based on your project structure

// Fetch all projects
const fetchAllProjects = async (req, res) => {
    try {
      // Fetch all projects from the database
      const projects = await Project.find();

      // Return the projects as JSON response
      res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get an individual project by ID
const getIndividualProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    // Create a new project in MongoDB
    const imageUrls = req.files.map((file) => file.path);

    const newProject = await Project.create(projectData);

    // Extract Cloudinary URLs from uploaded images
    // Update the project's images field with Cloudinary URLs
    newProject.images = imageUrls;
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a project by ID
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }
    res.send({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  fetchAllProjects,
  getIndividualProject,
  createProject,
  updateProject,
  deleteProject,
};

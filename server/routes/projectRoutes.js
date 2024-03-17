const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// cloudinary var
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "project-images",
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});
const parser = multer({ storage });

const {
  login,
  signup,
  getAllUserRecords,
  deleteUser,
  updateUser,
  getUserRecord,
  updatePassword,
} = require("../controller/UserController");
const {
  createProject,
  fetchAllProjects,
  getIndividualProject,
  updateProject,
  deleteProject,
} = require("../controller/ProjectController");

router.post("/login", login);
router.post("/signup", signup);
router.delete("/user/:id", deleteUser);
router.put("/user/:userId", updateUser);

// routes for projects
router.post("/newProject", parser.array('images', 10), createProject);
router.get("/allProject", fetchAllProjects);
router.get("/detailProject/:id", getIndividualProject);
router.put("/new/:id", updateProject);
router.delete("/delProject/:id", deleteProject);

module.exports = router;

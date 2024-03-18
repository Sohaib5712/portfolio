const express = require("express");
require("./connect");
const app = express();
const port = 5000; // Update this to your desired port
const cors = require("cors");
require("dotenv").config();
const projectRoutes = require("./routes/projectRoutes");

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// test route
// app.get("/", async (req, res) => {
//   res.json({ mssg: "Server is running" });
// });

// employee routes

app.use("/api/project", projectRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

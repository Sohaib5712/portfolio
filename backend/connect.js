const mongoose = require("mongoose");
const encodedPassword = encodeURIComponent("!Wasd@1234");
const uri = `mongodb+srv://sohaibsarwar5712:${encodedPassword}@portfolio.oz8uvsr.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.error(err);
  });

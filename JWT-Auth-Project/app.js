require("dotenv").config();
const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    sucess: 1,
    message: "This rest api is working",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log("Server is up and running", process.env.APP_PORT );
});
require("dotenv").config();

const express = require("express");

const app = express();

const dbConfig = require("./config/dbConfig");



const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log("Server running on port on port " + port);
});

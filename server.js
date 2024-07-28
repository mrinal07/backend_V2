require("dotenv").config();

const express = require("express");

const app = express();

// CORS added for Deployement purpose
const cors = require("cors");

// const allowedOrigins = ["https://mrinal-choudhary.netlify.app"];
const allowedOrigins = ["https://frontendv2-5yzhcce4v-mrinal07s-projects.vercel.app"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// CORS added for Deployement purpose

const dbConfig = require("./config/dbConfig");



const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log("Server running on port on port " + port);
});

require("dotenv").config();

const express = require("express");

const app = express();

// CORS added for Deployement purpose
const cors = require("cors");
app.use(cors());
// CORS added for Deployement purpose



const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());

app.use("/api/portfolio", portfolioRoute);

const redirectURL = require("./controllers/route.js")
app.use("/",redirectURL)

const port = process.env.PORT

|| 5000;
app.listen(port, () => {
  console.log("Server running on port on port " + port);
});

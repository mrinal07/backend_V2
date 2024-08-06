require("dotenv").config();

const express = require("express");

const app = express();

// CORS added for Deployement purpose
const cors = require("cors");
app.use(cors());
// CORS added for Deployement purpose

app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


const portfolioRoute = require("./routes/portfolioRoute");

app.use("/api/portfolio", portfolioRoute);

const redirectURL = require("./controllers/route.js")
app.use("/",redirectURL)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT

|| 5000;
app.listen(port, () => {
  console.log("Server running on port on port " + port);
});

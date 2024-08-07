require("dotenv").config();

const express = require("express");
const path = require('path'); // Import the path module

const app = express();

// CORS added for Deployement purpose
const cors = require("cors");
app.use(cors());
// CORS added for Deployement purpose

app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend_V2/build')));


const portfolioRoute = require("./routes/portfolioRoute");

app.use("/api/portfolio", portfolioRoute);

const redirectURL = require("./controllers/route.js")
app.use("/",redirectURL)

// Serve the manifest.json file correctly
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/manifest.json'));
});

// Catch-all route
console.log("Mrinal checking __dirname=> "+__dirname);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend_V2/build/index.html'));
// });

const port = process.env.PORT

|| 5000;
app.listen(port, () => {
  console.log("Server running on port on port " + port);
});

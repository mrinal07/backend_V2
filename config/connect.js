const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const mongoose = require('mongoose');

const connectionString = process.env.mongo_url;

const connectDB = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


module.exports = connectDB;

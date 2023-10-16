require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/auth");
const app = express();
const mongoose = require("mongoose");
const { MONGO_ATLAS_PASSWORD } = require("./env-constants");
const mongoURI = `mongodb+srv://fareedalam:${MONGO_ATLAS_PASSWORD}@cluster0.eohtahh.mongodb.net/?retryWrites=true&w=majority`;

// Connecting MongoDB
mongoose.connect(mongoURI);

// For logging requests
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Handling CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/auth", authRoutes);

// Handling errors
app.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

//Returning response with above error
app.use((error, req, res, next) => {
  res.status(error?.status || 500);
  res.json({
    error: {
      message: error?.message,
    },
  });
});

module.exports = app;

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const { MONGO_ATLAS_URI } = require("./env-constants");

// All routes
const authRoutes = require("./api/routes/auth");
const messageRoutes = require("./api/routes/message");
const uploadRoutes = require("./api/routes/upload");

// Connecting MongoDB
mongoose.connect(MONGO_ATLAS_URI);

//For accessing static files
app.use("/storage", express.static("storage"));

// For logging requests
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

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
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);

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

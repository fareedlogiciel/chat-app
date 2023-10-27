const mongoose = require("mongoose");
const Message = require("../models/message");

module.exports.upload_attachment = (req, res) => {
  try {
    return res.status(201).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: "Request failed.", err });
  }
};

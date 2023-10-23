const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    sender: { type: String, required: true, ref: "User" },
    receiver: { type: String, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);

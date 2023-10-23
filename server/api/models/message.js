const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    conversation_id: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

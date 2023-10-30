const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    sender_id: { type: String, required: true },
    sender_name: { type: String, required: true },
    receiver_id: { type: String, required: true },
    receiver_name: { type: String },
    text: { type: String },
    chat_type: { type: String, required: true },
    attachment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversation", conversationSchema);

const mongoose = require("mongoose");
const Conversation = require("../models/conversation");
const User = require("../models/user");

module.exports.new_conversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      _id: new mongoose.Types.ObjectId(),
      sender: req?.body?.sender,
      receiver: req?.body?.receiver,
    });
    const savedConversation = await newConversation?.save();
    return res.status(201).json({
      message: "Conversation creared successfully.",
      result: savedConversation,
    });
  } catch (err) {
    return res.status(500).json({ message: "Request failed.", err });
  }
};

module.exports.get_all_conversations = async (req, res) => {
  try {
    const conversations = await Conversation.find(
      {},
      { _id: 1, sender: 1, receiver: 1 }
    );
    return res.status(200).json(conversations);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports.get_conversations_by_user_id = async (req, res) => {
  if (req?.params?.user_id) {
    try {
      const conversations = await Conversation.find(
        {
          $or: [
            {
              sender: req?.params?.user_id,
            },
            { receiver: req?.params?.user_id },
          ],
        },
        { _id: 1, sender: 1, receiver: 1, createdAt: 1 }
      )
        .sort({ createdAt: -1 })
        .populate({
          path: "sender receiver",
          select: { _id: 1, name: 1, email: 1 },
        });

      return res.status(200).json(conversations);
    } catch (err) {
      return res.status(500).json({ err });
    }
  } else {
    return res.status(400).json({ message: "Please add user_id in params!" });
  }
};

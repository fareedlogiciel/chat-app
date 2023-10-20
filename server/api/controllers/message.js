const mongoose = require("mongoose");
const Message = require("../models/message");

module.exports.new_message = async (req, res) => {
  try {
    const newMessage = new Message({
      _id: new mongoose.Types.ObjectId(),
      conversation_id: req?.body?.conversation_id,
      sender: req?.body?.sender,
      receiver: req?.body?.receiver,
      text: req?.body?.text,
    });
    const savedMessage = await newMessage?.save();
    return res.status(201).json({
      message: "Message creared successfully.",
      conversation: savedMessage,
    });
  } catch (err) {
    return res.status(500).json({ message: "Request failed.", err });
  }
};

module.exports.get_all_messages = async (req, res) => {
  try {
    const messages = await Message.find(
      {},
      { _id: 1, conversation_id: 1, sender: 1, receiver: 1, text: 1 }
    );
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports.get_messages_by_con_id = async (req, res) => {
  if (req?.params?.conversation_id) {
    try {
      const messages = await Message.find(
        {
          conversation_id: req?.params?.conversation_id,
        },
        { _id: 1, conversation_id: 1, sender: 1, receiver: 1, text: 1 }
      );
      return res.status(200).json(messages);
    } catch (err) {
      return res.status(500).json({ err });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Please add conversation_id in params!" });
  }
};

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
      conversation: savedConversation,
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
        { _id: 1, sender: 1, receiver: 1 }
      );

      const formattedConversations = conversations?.map(
        async (conversation) => {
          if (conversation?.sender === req?.params?.user_id) {
            const user = await User.findOne(
              { _id: conversation?.receiver },
              { _id: 1, name: 1, email: 1 }
            );
            console.log("conversation", conversation);
            console.log("user 1", user);
            return {
              user,
              ...conversation,
            };
          } else {
            const user = await User.findOne(
              { _id: conversation?.sender },
              { _id: 1, name: 1, email: 1 }
            );
            console.log("conversation", conversation);
            console.log("user 2", user);
            return {
              user,
              ...conversation,
            };
          }
        }
      );
      return res.status(200).json(formattedConversations);
      // return res.status(200).json(conversations);
    } catch (err) {
      return res.status(500).json({ err });
    }
  } else {
    return res.status(400).json({ message: "Please add user_id in params!" });
  }
};

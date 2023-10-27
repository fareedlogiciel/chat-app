const mongoose = require("mongoose");
const Message = require("../models/message");

module.exports.new_message = async (req, res) => {
  try {
    const newMessage = new Message({
      _id: new mongoose.Types.ObjectId(),
      sender_id: req?.body?.sender_id,
      sender_name: req?.body?.sender_name,
      receiver_id: req?.body?.receiver_id,
      receiver_name: req?.body?.receiver_name,
      text: req?.body?.text,
    });
    const savedMessage = await newMessage?.save();
    return res.status(201).json({
      message: "Message creared successfully.",
      result: savedMessage,
    });
  } catch (err) {
    return res.status(500).json({ message: "Request failed.", err });
  }
};

module.exports.get_messages_by_user_id = async (req, res) => {
  if (req?.params?.user_id && req?.query?.selfId) {
    const query =
      req?.params?.user_id === "general"
        ? {
            receiver_id: req?.params?.user_id,
          }
        : {
            $or: [
              {
                $and: [
                  {
                    sender_id: req?.params?.user_id,
                  },
                  {
                    receiver_id: req?.query?.selfId,
                  },
                ],
              },
              {
                $and: [
                  {
                    sender_id: req?.query?.selfId,
                  },
                  {
                    receiver_id: req?.params?.user_id,
                  },
                ],
              },
            ],
          };

    try {
      const messages = await Message.find(query).sort({ createdAt: 1 });
      return res.status(200).json(messages);
    } catch (err) {
      return res.status(500).json({ err });
    }
  } else {
    return res.status(400).json({ message: "Please add user_id in params!" });
  }
};

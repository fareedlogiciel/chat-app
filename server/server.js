const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { PORT } = require("./env-constants");
const { SocketEvents } = require("./socket-events");
const Message = require("./api/models/message");
const mongoose = require("mongoose");

const server = http.createServer(app);
const socketIO = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

// Listen for when the client connects via socket.io-client
socketIO.on(SocketEvents.CONNECTION, (socket) => {
  // User connected!

  socket.on(SocketEvents.ADD_SOCKET_USER, (data) => {
    // Saving user's id along with socket id
    const userExists = users.some((user) => user?.userId === data?.user_id);
    if (!userExists) {
      users.push({
        userId: data?.user_id,
        socketId: socket?.id,
      });
    }

    // Adding user to general room for group chat
    socket?.join("general");
  });

  // Send message listener
  socket.on(SocketEvents.SEND_MESSAGE, async (data, callback) => {
    try {
      const newMessage = new Message({
        _id: new mongoose.Types.ObjectId(),
        sender_id: data?.sender_id,
        sender_name: data?.sender_name,
        receiver_id: data?.receiver_id,
        receiver_name: data?.receiver_name || null,
        text: data?.text,
        chat_type: data?.chat_type,
        // attachment: data?.attachment,
      });
      const savedMessage = await newMessage?.save();
      if (data?.receiver_id === "general") {
        console.log("savedMessage general", savedMessage);
        socket?.to("general")?.emit(SocketEvents.RECEIVE_MESSAGE, savedMessage);
      } else {
        const receiver = users.find(
          (user) => user?.userId === data?.receiver_id
        );
        if (receiver) {
          socketIO
            .to(receiver?.socketId)
            .emit(SocketEvents.RECEIVE_MESSAGE, savedMessage);
        }
        return callback(savedMessage);
      }
    } catch (err) {
      console?.error("Failed to emit!", err);
    }
  });

  socket.on(SocketEvents.DISCONNECT, () => {
    // User disconnected
    // Removing user's info from socket server
    users = users.filter((user) => user?.socketId !== socket?.id);
  });
});

server.listen(PORT, () => "Server is running on port 4000");

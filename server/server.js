const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { PORT } = require("./env-constants");
const { SocketEvents } = require("./socket-events");
console.log("SocketEvents", SocketEvents);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = [];
const addUser = (userId, sockerId) => {
  const userExists = users.some((user) => user?.userId === userId);
  console.log("userExists ===>", userExists);
  if (!userExists) {
    users.push({ userId, sockerId });
  }
  console.log("users ===>", users);
};

// Listen for when the client connects via socket.io-client
io.on(SocketEvents.CONNECTION, (socket) => {
  console.log("user connected ===>", socket?.id);
  io.emit(SocketEvents.WELCOME, "Hello, this is socket server");
  setTimeout(() => {
    io.emit(SocketEvents.WELCOME, "Hello 2, this is socket server");
  }, 10000);

  socket.on(SocketEvents.ADD_USER, (userId) => {
    addUser(userId, socket?.id);
    console.log("users", users);
    io.emit("getUsers", users);
  });

  // // Our socket event listeners
  // const CHAT_BOT = "ChatBot";
  // socket.on("join_room", (data) => {
  //   const { username, room } = data; // Data sent from client when join_room event emitted
  //   socket.join(room); // Join the user to a socket room
  //   const __createdtime__ = Date.now(); // Current timestamp
  //   // Send message to all users currently in the room, apart from the user that just joined
  //   socket.to(room).emit("receive_message", {
  //     message: `${username} has joined the chat room`,
  //     username: CHAT_BOT,
  //     __createdtime__,
  //   });
  //   socket.emit("receive_message", {
  //     message: `Welcome ${username}`,
  //     username: CHAT_BOT,
  //     __createdtime__,
  //   });
  // });
});

server.listen(PORT, () => "Server is running on port 4000");

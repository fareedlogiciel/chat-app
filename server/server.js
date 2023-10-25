const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { PORT } = require("./env-constants");
const { SocketEvents } = require("./socket-events");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = [];
const addUser = (userId, sockerId) => {
  const userExists = users.some((user) => user?.userId === userId);
  if (!userExists) {
    users.push({ userId, sockerId });
  }
};

// Listen for when the client connects via socket.io-client
io.on(SocketEvents.CONNECTION, (socket) => {
  console.log("connected ===>", socket?.id);

  //Listens and logs the message to the console
  socket.on(SocketEvents.MESSAGE, (data) => {
    console.log(data);
  });

  socket.on(SocketEvents.DISCONNECT, () => {
    console.log("disconnected");
  });
});

server.listen(PORT, () => "Server is running on port 4000");

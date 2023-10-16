import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Login from "./pages/login";

const socket = io.connect("http://localhost:4000");

function App() {
  useEffect(() => {
    socket.emit("join_room", { username: "John Doe", room: "javascript" });
  }, []);
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

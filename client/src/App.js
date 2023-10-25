/* eslint-disable react-hooks/exhaustive-deps */
import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "react-chat-elements/dist/main.css";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./dx-styles.scss";
import { useScreenSizeClass } from "./utils/media-query";
import AppRoutes from "./routes";
import { io } from "socket.io-client";
import { SocketEvents } from "./socket-events";

export default function Root() {
  const screenSizeClass = useScreenSizeClass();
  const socket = io.connect("http://localhost:4000");

  useEffect(() => {
    // socket.emit("join_room", { username: "John Doe", room: "javascript" });
  }, []);

  useEffect(() => {
    socket?.on(SocketEvents.WELCOME, (message) => {
      console.log("message", message);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className={`app ${screenSizeClass}`}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

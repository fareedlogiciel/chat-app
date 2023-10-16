import React from "react";
import "./home.scss";
import { Avatar, MessageList, Navbar } from "react-chat-elements";

export default function Home() {
  return (
    <div className={""}>
      <Navbar
        className="fixed-navbar"
        left={
          <Avatar
            src="https://avatars.githubusercontent.com/u/80540635?v=4"
            alt="avatar"
            size="xlarge"
            type="rounded"
          />
        }
        center={<div>Home</div>}
        right={<div>Contact</div>}
        type="dark"
      />
      <MessageList
        className="content-block message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
          {
            position: "left",
            type: "text",
            title: "Kursat",
            text: "Give me a message list example !",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "left",
            type: "text",
            title: "Kursat",
            text: "Give me a message list example !",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
          {
            position: "left",
            type: "text",
            title: "Kursat",
            text: "Give me a message list example !",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          },
        ]}
      />
    </div>
  );
}

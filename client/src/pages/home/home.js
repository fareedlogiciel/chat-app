import "./home.scss";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, MessageList, Navbar } from "react-chat-elements";
import test_video from "./../../assets/test_video.mp4";
import MessageInput from "react-input-emoji";
import ScrollView from "devextreme-react/scroll-view";

export default function Home() {
  const messageListBottomRef = useRef(null);
  const [text, setText] = useState("");

  const handleOnEnter = (text) => {
    console.log("text on enter-->", text);
  };

  useEffect(() => {
    if (messageListBottomRef?.current) {
      messageListBottomRef?.current?.scrollIntoView({
        behavior: "smooth",

        block: "center",
        inline: "start",
      });
    }
  }, []);

  return (
    <div>
      <div className="user-navbar-container">
        <Navbar
          className="user-navbar"
          left={
            <div>
              <Avatar
                src="https://avatars.githubusercontent.com/u/80540635?v=4"
                alt="avatar"
                size="xlarge"
                type="circle"
              />
              <p className="user-name">Kursat</p>
            </div>
          }
        />
      </div>
      <div className="message-list-container">
        <ScrollView>
          <MessageList
            className="content-block message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={[
              {
                position: "left",
                type: "text",
                title: "Kursat",
                date: new Date(),
                text: "Give me a message list example !",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "right",
                type: "video",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
                data: {
                  videoURL: test_video,
                  status: {
                    loading: 0.5,
                    download: true,
                  },
                },
              },
              {
                position: "left",
                type: "file",
                title: "Kursat",
                text: "Give me a message list example !",
                date: new Date(),
                data: {
                  uri: "https://www.sample-videos.com/pdf/Sample-pdf-5mb.pdf",
                  status: {
                    click: false,
                    loading: 0,
                  },
                },
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                title: "Kursat",
                text: "Give me a message list example !",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                title: "Kursat",
                date: new Date(),
                text: "Give me a message list example !",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "right",
                type: "video",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
                data: {
                  videoURL: test_video,
                  status: {
                    loading: 0.5,
                    download: true,
                  },
                },
              },
              {
                position: "left",
                type: "file",
                title: "Kursat",
                text: "Give me a message list example !",
                date: new Date(),
                data: {
                  uri: "https://www.sample-videos.com/pdf/Sample-pdf-5mb.pdf",
                  status: {
                    click: false,
                    loading: 0,
                  },
                },
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                title: "Kursat",
                text: "Give me a message list example !",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                title: "Kursat",
                date: new Date(),
                text: "Give me a message list example !",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "right",
                type: "video",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
                data: {
                  videoURL: test_video,
                  status: {
                    loading: 0.5,
                    download: true,
                  },
                },
              },
              {
                position: "left",
                type: "file",
                title: "Kursat",
                text: "Give me a message list example !",
                date: new Date(),
                data: {
                  uri: "https://www.sample-videos.com/pdf/Sample-pdf-5mb.pdf",
                  status: {
                    click: false,
                    loading: 0,
                  },
                },
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                title: "Kursat",
                text: "Give me a message list example !",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                date: new Date(),
              },
            ]}
          />
          <div
            ref={messageListBottomRef}
            // style={{ width: 1, height: 1 }}
          />
        </ScrollView>
      </div>
      <div className="message-input-container">
        <MessageInput
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          keepOpened
          height={20}
        />
      </div>
    </div>
  );
}

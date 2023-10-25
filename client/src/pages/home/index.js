import "./home.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, MessageList } from "react-chat-elements";
import MessageInput from "react-input-emoji";
import ScrollView from "devextreme-react/scroll-view";
import { SideNavOuterToolbar } from "../../layouts";
import appInfo from "../../app-info";
import { fetchMessages, submitMessage } from "../../services/chat";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadIndicator from "devextreme-react/load-indicator";
import send_icon from "./../../assets/send.png";
import { Button } from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import socketIO from "socket.io-client";
import { SocketEvents } from "./../../socket-events";

const socket = socketIO.connect("http://localhost:4000");

export default function Home() {
  const { conversationId } = useParams();
  const messageListBottomRef = useRef(null);
  const { user } = useSelector((state) => state?.auth);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(null);
  const [otherUser, setOtherUser] = useState();

  const handleSubmit = async () => {
    try {
      if (text && user) {
        socket.emit(SocketEvents?.MESSAGE, {
          text: text?.trim(),
          name: user?.name,
          conversation_id: conversationId,
          sender: user?._id,
          receiver: otherUser?._id,
          socketId: socket.id,
        });
        const data = {
          conversation_id: conversationId,
          sender: user?._id,
          receiver: otherUser?._id,
          text: text?.trim(),
        };
        await submitMessage(data);
        setText("");
        getMessages();
      }
    } catch (err) {
      notify(err, "error", 2000);
    }
  };

  const getMessages = useCallback(async () => {
    try {
      if (conversationId) {
        const tempData = await fetchMessages(conversationId);
        setMessages(tempData);
        if (tempData && tempData?.length) {
          const requiredUser =
            user?._id === tempData[0]?.sender?._id
              ? tempData[0]?.receiver
              : tempData[0]?.sender;

          setOtherUser(structuredClone(requiredUser));
        } else {
          setOtherUser(null);
        }
        setLoading(false);
      }
    } catch (err) {
      console.error("Error (While fetching messages): ", err);
      setMessages([]);
      setLoading(false);
    }
  }, [conversationId, user?._id]);

  useEffect(() => {
    setLoading(true);
    getMessages();
  }, [conversationId, getMessages]);

  useEffect(() => {
    messageListBottomRef?.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <SideNavOuterToolbar title={appInfo.title}>
      {conversationId && (
        <div>
          <div>
            <div className="user-navbar-container">
              <div className="user-navbar">
                {conversationId === "general" ? (
                  <p className="user-name"># General</p>
                ) : (
                  <>
                    {otherUser && (
                      <>
                        <Avatar
                          alt="avatar"
                          size="large"
                          type="circle"
                          letterItem={{
                            id: otherUser?._id || "",
                            letter: otherUser?.name?.at(0) || "",
                          }}
                        />
                        <p className="user-name">{otherUser?.name}</p>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="message-list-container">
              <ScrollView>
                <div>
                  {loading ? (
                    <div className="load-indication-container">
                      <LoadIndicator />
                    </div>
                  ) : (
                    <MessageList
                      className="content-block message-list"
                      lockable={true}
                      toBottomHeight={"100%"}
                      dataSource={
                        messages?.map((message) => {
                          const tempObj = {
                            type: "text",
                            title: message?.sender?.name,
                            text: message.text,
                            date: message?.createdAt,
                            position: "left",
                          };
                          if (user?._id === message?.sender?._id) {
                            tempObj.position = "right";
                          }
                          return tempObj;
                        }) || []
                      }
                    />
                  )}
                  <div ref={messageListBottomRef} />
                </div>
              </ScrollView>
            </div>
            <div className="message-input-container">
              <MessageInput
                keepOpened
                value={text}
                onChange={setText}
                onEnter={handleSubmit}
              />
              <Button
                disabled={!text}
                icon={send_icon}
                type="normal"
                stylingMode="contained"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </SideNavOuterToolbar>
  );
}

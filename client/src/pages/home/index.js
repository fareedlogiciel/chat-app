import "./home.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, MessageList } from "react-chat-elements";
import MessageInput from "react-input-emoji";
import ScrollView from "devextreme-react/scroll-view";
import { SideNavOuterToolbar } from "../../layouts";
import appInfo from "../../app-info";
import { fetchMessages } from "../../services/chat";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadIndicator from "devextreme-react/load-indicator";
import send_icon from "./../../assets/send.png";
import attachment_icon from "./../../assets/attachment.svg";
import { Button } from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import socketIO from "socket.io-client";
import { SocketEvents } from "./../../socket-events";

const socket = socketIO.connect("http://localhost:4000");

export default function Home() {
  const { otherUserId } = useParams();
  const isGeneral = otherUserId === "general";
  const messageListBottomRef = useRef(null);
  const { users } = useSelector((state) => state?.app);
  const { user } = useSelector((state) => state?.auth);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState();

  const uploadAttachment = useCallback(() => {
    console.log("uploadAttachment clicked!");
  }, []);

  useEffect(() => {
    // Adding user to socket server
    socket.emit(SocketEvents.ADD_SOCKET_USER, { user_id: user?._id });
  }, [user?._id]);

  const handleSubmit = async () => {
    try {
      if (text && user) {
        const data = {
          text: text?.trim(),
          sender_id: user?._id,
          sender_name: user?.name,
          receiver_id: otherUser?._id,
          receiver_name: otherUser?.name,
        };
        socket.emit(SocketEvents?.SEND_MESSAGE, data, (res) => {
          updateMessageList(res);
        });
        setText("");
      }
    } catch (err) {
      notify(err, "error", 2000);
    }
  };

  const getMessages = useCallback(async () => {
    try {
      if (otherUserId) {
        setMessages([]);
        const tempMessages = await fetchMessages(otherUserId, user?._id);
        if (tempMessages && tempMessages?.length) {
          const formattedMessages = tempMessages?.map((item) => {
            const formattedMessage = {
              type: "text",
              title: item?.sender_name,
              text: item?.text,
              date: item?.createdAt,
              position: "left",
            };
            if (otherUserId === item?.receiver_id) {
              formattedMessage.position = "right";
            }
            return formattedMessage;
          });
          setMessages(structuredClone(formattedMessages));
        }
        setLoading(false);
      }
    } catch (err) {
      console.error("Error (While fetching messages): ", err);
      setMessages([]);
      setLoading(false);
    }
  }, [otherUserId, user?._id]);

  const updateMessageList = useCallback(
    (data) => {
      const formattedMessage = {
        type: "text",
        title: data?.sender_name,
        text: data?.text,
        date: data?.createdAt,
        position: "left",
      };
      if (otherUserId === data?.receiver_id) {
        formattedMessage.position = "right";
      }
      setMessages((prev) => {
        return [...prev, { ...formattedMessage }];
      });
    },
    [otherUserId]
  );

  useEffect(() => {
    setLoading(true);
    getMessages();
  }, [otherUserId, getMessages]);

  useEffect(() => {
    if (users && users?.length) {
      setOtherUser(users.find((user) => user?._id === otherUserId));
    }
  }, [otherUserId, users]);

  useEffect(() => {
    messageListBottomRef?.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  useEffect(() => {
    socket.on(SocketEvents.RECEIVE_MESSAGE, (data) => {
      updateMessageList(data);
    });
    return () => socket.off(SocketEvents.RECEIVE_MESSAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SideNavOuterToolbar title={appInfo.title}>
      {otherUserId && (
        <div>
          <div>
            <div className="user-navbar-container">
              <div className="user-navbar">
                {isGeneral ? (
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
                    <>
                      {messages?.length ? (
                        <MessageList
                          className="content-block message-list"
                          lockable={true}
                          toBottomHeight={"100%"}
                          dataSource={messages}
                        />
                      ) : (
                        <p className="text-center">
                          {isGeneral ? (
                            `Send message to everyone here. All users can see you!`
                          ) : (
                            <>
                              Start chat with <b>{otherUser?.name}</b>, send
                              your first message now!
                            </>
                          )}
                        </p>
                      )}
                    </>
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
                icon={attachment_icon}
                onClick={uploadAttachment}
                className="attach-btn"
              />
              <Button
                disabled={!text}
                icon={send_icon}
                className="send-btn"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </SideNavOuterToolbar>
  );
}

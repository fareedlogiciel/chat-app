import "./home.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, MessageList } from "react-chat-elements";
import MessageInput from "react-input-emoji";
import ScrollView from "devextreme-react/scroll-view";
import { SideNavOuterToolbar } from "../../layouts";
import appInfo from "../../app-info";
import { fetchMessages, saveAttachment } from "../../services/chat";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadIndicator from "devextreme-react/load-indicator";
import send_icon from "./../../assets/send.png";
import attachment_icon from "./../../assets/attachment.svg";
import file_icon from "./../../assets/file.svg";
import close_icon from "./../../assets/close.svg";
import announce_icon from "./../../assets/announce.png";
import { Button } from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import socketIO from "socket.io-client";
import { SocketEvents } from "./../../socket-events";
import { openLinkInNewTab } from "../../utils";
import {
  REACT_APP_MEDIA_BASE_URL,
  REACT_APP_SOCKET_URL,
} from "../../env-constants";

const socket = socketIO.connect(REACT_APP_SOCKET_URL);

export default function Home() {
  const navigate = useNavigate();
  const attachmentRef = useRef();
  const { otherUserId } = useParams();
  const isGeneral = otherUserId === "general";
  const messageListBottomRef = useRef(null);
  const { users } = useSelector((state) => state?.app);
  const { user } = useSelector((state) => state?.auth);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState();
  const [attachment, setAttachment] = useState(null);

  const handleViewFile = useCallback((item) => {
    openLinkInNewTab(`${REACT_APP_MEDIA_BASE_URL}/${item?.data?.uri}`);
  }, []);

  const handleTitleClick = useCallback(
    (item) => {
      navigate(`/chat/${item?.sender_id}`);
    },
    [navigate]
  );

  const openAttachment = () => {
    openLinkInNewTab(URL.createObjectURL(attachment));
  };

  const scrollToBottom = useCallback(() => {
    messageListBottomRef?.current?.scrollIntoView({ behavior: "instant" });
  }, [messageListBottomRef]);

  const uploadAttachment = useCallback(() => {
    attachmentRef?.current?.click();
  }, [attachmentRef]);

  useEffect(() => {
    if (user) {
      // Adding user to socket server
      socket.emit(SocketEvents.ADD_SOCKET_USER, { user_id: user?._id });
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (user && (text || attachment)) {
        const data = {
          sender_id: user?._id,
          sender_name: user?.name,
          receiver_id: isGeneral ? "general" : otherUser?._id,
          receiver_name: otherUser?.name || null,
          chat_type: isGeneral ? "public" : "private",
          text: text?.trim() || null,
          attachment: null,
        };
        if (attachment) {
          const filePath = await saveAttachment(attachment);
          data.attachment = filePath;
        }
        socket.emit(SocketEvents?.SEND_MESSAGE, data, (response) => {
          updateMessageList(response);
        });
        setText("");
        setAttachment(null);
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
              type: item?.attachment ? "file" : "text",
              title: item?.sender_name,
              text: item?.text,
              date: item?.createdAt,
              position: item?.sender_id === user?._id ? "right" : "left",
              sender_id: item?.sender_id,
            };
            if (item?.attachment) {
              formattedMessage.data = {
                uri: item?.attachment,
                status: {
                  download: true,
                  click: true,
                },
              };
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
        type: data?.attachment ? "file" : "text",
        title: data?.sender_name,
        text: data?.text,
        date: data?.createdAt,
        position: data?.sender_id === user?._id ? "right" : "left",
        sender_id: data?.sender_id,
      };
      if (data?.attachment) {
        formattedMessage.data = {
          uri: data?.attachment,
          status: {
            download: true,
            click: true,
          },
        };
      }
      setMessages((prev) => {
        return [...prev, { ...formattedMessage }];
      });
    },
    [user]
  );

  useEffect(() => {
    setText("");
    setAttachment(null);
    setLoading(true);
    getMessages();
  }, [otherUserId, getMessages]);

  useEffect(() => {
    if (users && users?.length) {
      setOtherUser(users.find((user) => user?._id === otherUserId));
    }
  }, [otherUserId, users]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    socket.on(SocketEvents.RECEIVE_MESSAGE, (data) => {
      updateMessageList(data);
    });
    return () => socket.off(SocketEvents.RECEIVE_MESSAGE);
  }, [updateMessageList]);

  return (
    <SideNavOuterToolbar title={appInfo.title}>
      {otherUserId && (
        <div>
          <div>
            <div className="user-navbar-container">
              <div className="user-navbar">
                {isGeneral ? (
                  <div className={"general-info"}>
                    <img src={announce_icon} alt="" />
                    <p className="user-name"># General</p>
                  </div>
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
            <div
              className={`message-list-container ${attachment ? "h1" : "h2"}`}
            >
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
                          onOpen={handleViewFile}
                          onTitleClick={handleTitleClick}
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
              {attachment && (
                <div className={"attachment-info"}>
                  <Button
                    icon={file_icon}
                    className="attachment-btn"
                    onClick={openAttachment}
                  />
                  <p className="attachment-name" onClick={openAttachment}>
                    {attachment?.name || "abc.png"}
                  </p>
                  <Button
                    icon={close_icon}
                    type="normal"
                    className="attachment-btn"
                    onClick={() => setAttachment("")}
                    stylingMode="text"
                  />
                  {/* <img src={close_icon} alt="" className="close-btn" /> */}
                </div>
              )}
              <Button
                icon={attachment_icon}
                onClick={uploadAttachment}
                className="attach-btn"
              />
              <MessageInput
                keepOpened
                value={text}
                onChange={setText}
                onEnter={handleSubmit}
              />
              <Button
                disabled={!(text || attachment)}
                icon={send_icon}
                className="send-btn"
                onClick={handleSubmit}
              />
              <input
                type="file"
                style={{ display: "none" }}
                ref={attachmentRef}
                onChange={(e) => setAttachment(e?.target?.files[0])}
              />
            </div>
          </div>
        </div>
      )}
    </SideNavOuterToolbar>
  );
}

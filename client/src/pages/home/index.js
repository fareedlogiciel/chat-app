import "./home.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, MessageList } from "react-chat-elements";
import MessageInput from "react-input-emoji";
import ScrollView from "devextreme-react/scroll-view";
import { SideNavOuterToolbar } from "../../layouts";
import appInfo from "../../app-info";
import { fetchMessages } from "../../services/chat";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadIndicator from "devextreme-react/load-indicator";

export default function Home() {
  const { conversationId } = useParams();
  const messageListBottomRef = useRef(null);
  const { user } = useSelector((state) => state?.auth);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(null);
  const [otherUser, setOtherUser] = useState();

  const handleOnEnter = (text) => {};

  const getMessages = useCallback(async () => {
    try {
      if (conversationId) {
        setLoading(true);
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
    getMessages();
  }, [conversationId, getMessages]);

  useEffect(() => {
    if (messageListBottomRef?.current) {
      messageListBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageListBottomRef, conversationId]);

  return (
    <SideNavOuterToolbar title={appInfo.title}>
      {conversationId && (
        <>
          {loading ? (
            <div className="load-indication-container">
              <LoadIndicator height={30} width={30} />
            </div>
          ) : (
            <div>
              <>
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
                      <div
                        style={{ width: 1, height: 1 }}
                        ref={messageListBottomRef}
                      ></div>
                    </div>
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
              </>
            </div>
          )}
        </>
      )}
    </SideNavOuterToolbar>
  );
}

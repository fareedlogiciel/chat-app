import React, { useEffect, useCallback, useMemo } from "react";
import "./SideNavigationMenu.scss";
import { ChatList } from "react-chat-elements";
import ScrollView from "devextreme-react/scroll-view";
import { fetchConversations } from "../../services/chat";
import {
  setConversationsOnStore,
  setLoadingConversations,
} from "../../store/reducers/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import announce from "./../../assets/announce.png";

export default function SideNavigationMenu(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  const { children } = props;
  const { conversations, loadingConversations } = useSelector(
    (state) => state?.app
  );

  const formattedConversations = useMemo(() => {
    const tempConversations = conversations?.map((conversation, i) => {
      const requiredUser =
        user?._id === conversation?.sender?._id
          ? conversation?.receiver
          : conversation?.sender;
      const conversationItem = {
        letterItem: {
          letter: requiredUser?.name?.at(0),
          id: conversation?._id,
        },
        title: requiredUser?.name,
        subtitle: "Click to start chat!",
        date: conversation?.createdAt,
        unread: i,
      };
      return conversationItem;
    });
    tempConversations?.splice(0, 0, {
      avatar: announce,
      title: "General (Public)",
      subtitle: "Click to start chat!",
      date: "",
      unread: 5,
    });
    return tempConversations;
  }, [conversations, user]);

  const getConversations = useCallback(async () => {
    try {
      const tempData = await fetchConversations(user?._id);
      dispatch(setConversationsOnStore(tempData));
      dispatch(setLoadingConversations(false));
    } catch (err) {
      console.error("Error (While fetching conversations): ", err);
      dispatch(setLoadingConversations(false));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return (
    <div className={"dx-swatch-additionald side-navigation-menu bg-white"}>
      {children}
      <ScrollView>
        <div className={"menu-container"}>
          {!loadingConversations && (
            <>
              {formattedConversations?.length === 0 ? (
                <p className="not-found">Conversation history not found!</p>
              ) : (
                <ChatList
                  className="chat-list"
                  dataSource={formattedConversations}
                  onClick={(item) => {
                    navigate(`/chat/${item?.letterItem?.id || "general"}`);
                  }}
                />
              )}
            </>
          )}
        </div>
      </ScrollView>
    </div>
  );
}

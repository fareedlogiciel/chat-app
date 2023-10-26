import React, { useEffect, useCallback, useMemo } from "react";
import "./SideNavigationMenu.scss";
import { ChatList } from "react-chat-elements";
import ScrollView from "devextreme-react/scroll-view";
import { fetchAllUsers } from "../../services/chat";
import {
  setUsersOnStore,
  setLoadingConversations,
} from "../../store/reducers/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import announce from "./../../assets/announce.png";

export default function SideNavigationMenu(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { children } = props;
  const { users, loadingUsers } = useSelector((state) => state?.app);
  const { user } = useSelector((state) => state?.auth);

  const formattedConversation = useMemo(() => {
    const tempConversations = [];
    users?.forEach((item, i) => {
      const conversationItem = {
        letterItem: {
          letter: item?.name?.at(0),
          id: item?._id,
        },
        title: item?.name,
        subtitle: "Click to start chat, or view chat history!",
        date: item?.createdAt,
        id: item?._id,
      };
      if (conversationItem?.id !== user?._id) {
        tempConversations?.push(conversationItem);
      }
    });
    tempConversations?.splice(0, 0, {
      avatar: announce,
      title: "General (Public)",
      subtitle: "Click to start chat, or view chat history!",
      date: "",
      id: "general",
    });
    return tempConversations;
  }, [user?._id, users]);

  const getAllUsers = useCallback(async () => {
    try {
      const tempData = await fetchAllUsers();
      dispatch(setUsersOnStore(tempData));
      dispatch(setLoadingConversations(false));
    } catch (err) {
      console.error("Error (While fetching users): ", err);
      dispatch(setLoadingConversations(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className={"dx-swatch-additionald side-navigation-menu bg-white"}>
      {children}
      <ScrollView>
        <div className={"menu-container"}>
          {!loadingUsers && (
            <>
              {formattedConversation?.length === 0 ? (
                <p className="not-found">No one joined yet!</p>
              ) : (
                <ChatList
                  className="chat-list"
                  dataSource={formattedConversation}
                  onClick={(item) => {
                    navigate(`/chat/${item?.id}`);
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

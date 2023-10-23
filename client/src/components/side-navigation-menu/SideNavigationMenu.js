/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { navigation } from "../../app-navigation";
import { useNavigation } from "../../contexts/navigation";
import { useScreenSize } from "../../utils/media-query";
import "./SideNavigationMenu.scss";
import * as events from "devextreme/events";
import { ChatList } from "react-chat-elements";
import ScrollView from "devextreme-react/scroll-view";
import { fetchConversations } from "../../services/conversation";
import {
  setConversationsOnStore,
  setLoadingConversations,
} from "../../store/reducers/app";
import { useDispatch, useSelector } from "react-redux";

export default function SideNavigationMenu(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { conversations, loadingConversations } = useSelector(
    (state) => state?.app
  );
  const { children, openMenu, compactMode } = props;

  const formattedConversations = useMemo(() => {
    const tempConversations = conversations?.map((conversation, i) => {
      const avatarText =
        user?._id === conversation?.sender?._id
          ? conversation?.receiver?.name?.at(0)
          : conversation?.sender?.name?.at(0);
      const conversationItem = {
        letterItem: {
          id: avatarText,
          letter: avatarText,
        },
        title:
          user?._id === conversation?.sender?._id
            ? conversation?.receiver?.name
            : conversation?.sender?.name,
        subtitle: "Click to start chat!",
        date: conversation?.createdAt,
        unread: i,
      };
      return conversationItem;
    });
    return tempConversations;
  }, [conversations, user]);

  // const { isLarge } = useScreenSize();
  // function normalizePath() {
  //   return navigation.map((item) => ({
  //     ...item,
  //     expanded: isLarge,
  //     path: item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path,
  //   }));
  // }

  // const items = useMemo(normalizePath, []);

  const {
    navigationData: { currentPath },
  } = useNavigation();

  const treeViewRef = useRef(null);
  const wrapperRef = useRef();
  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", (e) => {
        openMenu(e);
      });
    },
    [openMenu]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  const getConversations = useCallback(async () => {
    try {
      const { conversations: tempData } = await fetchConversations(user?._id);
      dispatch(setConversationsOnStore(tempData));
      dispatch(setLoadingConversations(false));
    } catch (err) {
      console.error("Error (While fetching conversations): ", err);
      dispatch(setLoadingConversations(false));
    }
  }, [user]);

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return (
    <div
      className={"dx-swatch-additionald side-navigation-menu bg-white"}
      ref={getWrapperRef}
    >
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
                />
              )}
            </>
          )}
        </div>
      </ScrollView>
    </div>
  );
}

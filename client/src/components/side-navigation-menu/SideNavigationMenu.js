/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import TreeView from "devextreme-react/tree-view";
import { navigation } from "../../app-navigation";
import { useNavigation } from "../../contexts/navigation";
import { useScreenSize } from "../../utils/media-query";
import "./SideNavigationMenu.scss";
import * as events from "devextreme/events";
import { ChatList } from "react-chat-elements";
import ScrollView from "devextreme-react/scroll-view";

export default function SideNavigationMenu(props) {
  const { children, selectedItemChanged, openMenu, compactMode, onMenuReady } =
    props;

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

  return (
    <div
      style={{ backgroundColor: "#fff" }}
      className={"dx-swatch-additionald side-navigation-menu"}
      ref={getWrapperRef}
    >
      {children}
      <ScrollView>
        <div className={"menu-container"}>
          {/* <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={"path"}
          selectionMode={"single"}
          focusStateEnabled={false}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={"100%"}
        /> */}
          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date("2023/10/16 16:12"),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 2,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 5,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 1,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
            ]}
          />
        </div>
      </ScrollView>
    </div>
  );
}

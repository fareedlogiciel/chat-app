/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import List from "devextreme-react/list";
import { useDispatch, useSelector } from "react-redux";
import "./UserPanel.scss";
import { logout } from "../../store/reducers/auth";

export default function UserPanel({ menuMode }) {
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function navigateToProfile() {
    navigate("/profile");
  }
  const menuItems = useMemo(
    () => [
      {
        text: "Profile",
        icon: "user",
        onClick: navigateToProfile,
      },
      {
        text: "Logout",
        icon: "runner",
        onClick: () => dispatch(logout()),
      },
    ],
    []
  );

  return (
    <div className={"user-panel"}>
      <div className={"user-info"}>
        <div className={"image-container"}>
          <div
            style={{
              // background: `url(${"https://avatars.githubusercontent.com/u/80540635?v=4"}) no-repeat #fff`,
              backgroundSize: "cover",
              backgroundColor: "green",
              color: "#fff",
              fontSize: 20,
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={"user-image"}
          >
            {user?.name?.at(0) || ""}
          </div>
        </div>
        <div className={"user-name"}>{user?.name}</div>
      </div>

      {menuMode === "context" && (
        <ContextMenu
          items={menuItems}
          target={".user-button"}
          showEvent={"dxclick"}
          width={210}
          cssClass={"user-menu"}
        >
          <Position
            my={{ x: "center", y: "top" }}
            at={{ x: "center", y: "bottom" }}
          />
        </ContextMenu>
      )}
      {menuMode === "list" && (
        <List className={"dx-toolbar-menu-action"} items={menuItems} />
      )}
    </div>
  );
}

import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import List from "devextreme-react/list";
import { useDispatch, useSelector } from "react-redux";
import "./UserPanel.scss";
import { resetAuth } from "../../store/reducers/auth";
import { resetApp } from "../../store/reducers/app";

export default function UserPanel({ menuMode }) {
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onLogout = useCallback(() => {
    dispatch(resetAuth());
    dispatch(resetApp());
  }, [dispatch]);

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
        onClick: onLogout,
      },
    ],
    [navigateToProfile, onLogout]
  );

  return (
    <div className={"user-panel"}>
      <div className={"user-info"}>
        <div className={"image-container"}>
          <div className={"user-image"}>{user?.name?.at(0) || ""}</div>
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

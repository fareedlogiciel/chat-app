import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "react-chat-elements/dist/main.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./dx-styles.scss";
import { useScreenSizeClass } from "./utils/media-query";
import AppRoutes from "./routes";
// import { config } from "dotenv";
// config();

// require("dotenv")?.config();

export default function Root() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <BrowserRouter>
      <div className={`app ${screenSizeClass}`}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

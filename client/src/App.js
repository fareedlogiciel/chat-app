import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "react-chat-elements/dist/main.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./dx-styles.scss";
import LoadPanel from "devextreme-react/load-panel";
import { NavigationProvider } from "./contexts/navigation";
import { useScreenSizeClass } from "./utils/media-query";
import Content from "./Content";
import UnauthenticatedContent from "./UnauthenticatedContent";
import { useSelector } from "react-redux";
// import { config } from "dotenv";
// config();

// require("dotenv")?.config();

function App() {
  const { loading, user } = useSelector((state) => state?.auth);

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

export default function Root() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <NavigationProvider>
        <div className={`app ${screenSizeClass}`}>
          <App />
        </div>
      </NavigationProvider>
    </Router>
  );
}

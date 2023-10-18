import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "react-chat-elements/dist/main.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./dx-styles.scss";
import LoadPanel from "devextreme-react/load-panel";
import { NavigationProvider } from "./contexts/navigation";
import { AuthProvider, useAuth } from "./contexts/auth";
import { useScreenSizeClass } from "./utils/media-query";
import Content from "./Content";
import UnauthenticatedContent from "./UnauthenticatedContent";
import { REACT_APP_API_BASE_URL } from "./env-constants";
// import { config } from "dotenv";
// config();

// require("dotenv")?.config();

console.log("REACT_APP_API_BASE_URL", REACT_APP_API_BASE_URL);

function App() {
  const { user, loading } = useAuth();

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
      <AuthProvider>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}

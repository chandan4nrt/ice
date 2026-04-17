import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { LogoProvider } from "./context/LogoContext";
import { AuthProvider } from "./context/AuthProvider";
import QueryProvider from "./reactQueryConfig/QueryProvider";
import { NotificationProvider } from "./context/NotificationContext";
import { LoaderProvider } from "./context/LoaderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <NotificationProvider>
        <LoaderProvider>
          <LogoProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LogoProvider>
        </LoaderProvider>
      </NotificationProvider>
    </QueryProvider>
  </React.StrictMode>,
);

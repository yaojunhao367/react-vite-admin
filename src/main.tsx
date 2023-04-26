import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store";
import App from "./App";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ConfigProvider locale={enUS}>
          <App />
        </ConfigProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.min.css";
import { ConfigProvider } from "antd";
import VietNam from "antd/lib/locale/vi_VN";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={VietNam}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

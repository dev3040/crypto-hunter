import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CryptoContext from "./CryptoContext";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CryptoContext>
        <App />
      </CryptoContext>
    </Provider>
  </React.StrictMode>
);

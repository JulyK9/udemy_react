import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // 리액트에서 사용하기 위한 Provider
import store from "./store/index"; // export한 store 불러오기

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 저장소를 전체에서 사용하기 위해 제일 상위 수준 컴포넌트에서 감싸주고 store 설정
  <Provider store={store}>
    <App />
  </Provider>
);

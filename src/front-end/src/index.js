// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <App />
// );
import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import { Provider } from "react-redux";
import { loginSuccess } from "./redux/account/Account";
import store from "./redux/Store";
import 'bootstrap/dist/css/bootstrap.min.css';
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  // Nếu token đã được lưu trữ trong Local Storage
  store.dispatch(loginSuccess(user)); // Sử dụng action loginSuccess để khôi phục trạng thái đăng nhập
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

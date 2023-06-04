/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, RegisterUser } from "../../api/Account";
import "./Auth.scss"
import { useSnackbar } from "notistack";


const Login = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const [userNameLogin, setUserNameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const hanldeLogin = (e) => {
    e.preventDefault();
    const newUser = {
      userName: userNameLogin,
      password: passwordLogin,
    };
    LoginUser(newUser, dispatch, naviagate);
    // enqueueSnackbar("Đăng nhập thành công", {
    //   variant: "success",
    // }); 
   
    
  };
  return (
    <>
      <Header />
      <div className="text-center mt-5 text-danger">
        <h2>Đăng Nhập</h2>
      </div>
      <div className="form-container">
        <form onSubmit={hanldeLogin}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập vào tên ..."
              required
              onChange={(e) => setUserNameLogin(e.target.value)}
            />
          </div>
          <div className="form-group mb-3 mt-3">
            <input
              type="password"
              className="form-control"
              placeholder="Nhập vào mật khẩu ..."
              required
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-success">
              Đăng nhập
            </button>
            <div className="text-end mt-3">
              Bạn chưa có tài khoản? 
              <Link to={`/register`} className=" text-danger px-1">
                Đăng ký
              </Link>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};
export default Login;

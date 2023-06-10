/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/Account";
import "./Auth.scss"
import { useSnackbar } from "notistack";
import Layout from "../../components/user/common/Layout";


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
    LoginUser(newUser, dispatch, naviagate).then(
      ()=>{
        // lưu đăng nhập vào Local Store
        localStorage.setItem("isLoggedIn", true)
        
      }
    ).catch((error)=>{
      enqueueSnackbar("Đăng nhập không thành công: " + error.message, {
        variant: "error",
      });
    });
    
    // enqueueSnackbar("Đăng nhập thành công", {
    //   variant: "success",
    // }); 
  };
  return (
    <Layout>
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

    </Layout>
  );
};
export default Login;

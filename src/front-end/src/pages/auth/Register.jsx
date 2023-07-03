import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/Account";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import "./Auth.scss"

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const hanldeRegister = (e) => {
    e.preventDefault();
    const newRegister = {
      userName: userName,
      password: password,
      confirmPassword: confirmPassword,
    };
    RegisterUser(newRegister, dispatch, naviagate);
    console.log("Đăng ký thành công");
  };

  return (
    <>
      <Header />
      <div className="text-center mt-5 text-danger">
        <h2>Đăng Ký</h2>
      </div>
      <div className="form-container">
        <form onSubmit={hanldeRegister}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập vào tên ..."
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3 mt-3">
            <input
              type="password"
              className="form-control"
              placeholder="Nhập vào mật khẩu ..."
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-3 mt-3">
            <input
              type="password"
              className="form-control"
              placeholder="Xác nhận mật khẩu ..."
              required
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-success">
              Đăng ký
            </button>
            <div className="text-end mt-3">
              Bạn đã có tài khoản? 
              <Link to={`/login`} className=" text-danger px-1">
                Đăng nhập
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default Register;

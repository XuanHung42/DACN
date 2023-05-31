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
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/Account";

const Login = (props) => {
  const [userNameLogin, setUserNameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [userNameSignin, setUserNameSignin] = useState("");
  const [passwordLoginSignin, setPasswordLoginSignin] = useState("");
  const [comfirmPassword, setcomfirmPassword] = useState("");

  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const hanldeLogin = (e) => {
    e.preventDefault();
    const newUser = {
      userName: userNameLogin,
      password: passwordLogin,
    };
    LoginUser(newUser, dispatch, naviagate);
    console.log("Đăng nhập thành công");
  };

  const [justifyActive, setJustifyActive] = useState("tab1");
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <>
      <Header />
      <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Đăng nhập
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Đăng ký
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        {/* Login */}
        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <div className="mb-5"></div>
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
              </div>
            </form>
          </MDBTabsPane>

          {/* Sign in */}
          <MDBTabsPane show={justifyActive === "tab2"}>
            <div className="mb-5"></div>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập vào tên ..."
                  required
                />
              </div>
              <div className="form-group mb-3 mt-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Nhập vào mật khẩu ..."
                  required
                />
              </div>
              <div className="form-group mb-3 mt-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Xác nhận mật khẩu ..."
                  required
                />
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-success">
                  Đăng ký
                </button>
              </div>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
      <Footer />
    </>
  );
};
export default Login;

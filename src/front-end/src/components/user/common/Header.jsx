import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainMenu from "../menu/MainMenu";
import logo from "../image/logo_dlu.png";
import { Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUser] = useState();
  const naviagate = useNavigate();
  const hanldeLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
    
   
  };

  return (
    <header className="bg-success sticky-top">
      <nav className="container-fluid navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link to={"/"} className="text-danger text-decoration-none">
            <Image src={logo} alt="logo" className="logo" width={60} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-around"
            id="navbarSupportedContent"
          >
            <MainMenu />
          </div>
          <div className="button d-flex align-items-center">
            {user != null ? (
              <>
                <span className="text-white">
                  Xin chào
                  <Link to={`/profile/${user.result.id}`} className="px-1 text-decoration-none text-white">
                   {user.result.name}
                  </Link>
                  {/* {console.log("Check user: ", user.result)} */}
                </span>
                <div className="px-2">
                  <Button className="btn-danger" onClick={hanldeLogout}>
                    Đăng xuất
                  </Button>
                </div>
              </>
            ) : (
              <div className="px-2">
                <Link className="btn btn-primary" to={`/login`}>
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

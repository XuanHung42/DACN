import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainMenu from "../menu/MainMenu";
import logo from "../image/logo_dlu.png";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../redux/Store";
import { logout } from "../../../redux/account/Account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const dispatch = useDispatch()
  let user = useSelector((state) => state.auth.login.currentUser);
  console.log()
  const handleLogout = async() => {
    await dispatch(logout());
    navigate(`/`)
    window.location.reload();
   
  };
  const navigate = useNavigate();


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
                  <Link
                    to={`/profile/${user.result.id}`}
                    className="px-1 text-white"
                  >
                    {user.result.name}
                  </Link>
                  {console.log("Check user: ", user.result)}
                </span>

                {/* check role navigae */}
                {user.result.role === 1 ? (
                  navigate(`/admin`)
                ) : (
                  navigate(`/home`)
                )}
                <Link
                  className="btn btn-danger px-2 text-decoration-none"
                  to="/"
                  onClick={handleLogout}
                >
                  Đăng xuất
                  <FontAwesomeIcon icon={faSignOut} className="px-2"/>
                </Link>
              </>
            ) : (
              <div className="px-2">
                <Link className="btn btn-primary" to={`/login`}>
                  Đăng nhập
                  <FontAwesomeIcon icon={faSignIn} className="px-2"/>
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

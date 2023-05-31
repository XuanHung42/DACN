import React from "react";
import { Link } from "react-router-dom";
import MainMenu from "../menu/MainMenu";
import logo from "../image/logo_dlu.png";
import { Image } from "react-bootstrap";

const Header = () => {
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
          <div className="button d-flex">
            <div className="px-2">
              <Link className="btn btn-primary"  to={`/login`}>Đăng nhập</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

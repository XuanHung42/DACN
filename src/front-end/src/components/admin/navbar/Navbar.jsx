import React from "react";
import { Link } from "react-router-dom";
import "../stylead.scss";

const Navbar = () => {
  return (
    <>
      <div className="item-admin text-end px-5 py-3">
        <Link className="text-decoration-none">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.Lfc-ED0sVK9GOkjPJjB2cwAAAA&pid=Api&P=0"
            alt=""
            className="avatar"
          />
          <span className="px-2">Admin</span>
        </Link>
      </div>
    </>
  );
};
export default Navbar;

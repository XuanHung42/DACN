import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../image/404NotFound.jpg";
const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found";
  });

  return (
    <>
      <div className="text-center">
        <Link to={`/`} className="text-decoration-none">
          <img src={NotFoundImage} alt="page not found" />
          <h2 className="text-success">Quay về trang chủ</h2>
        </Link>
      </div>
    </>
  );
};
export default NotFound;

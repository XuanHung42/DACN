import React from "react";
import Researchers from "./Researcher";
import Departments from "./Department";
import Project from "./Project";

const Manage = () => {
  return (
    <div className="container">
      <div className="title">
        <h2 className="text-danger text-center mt-5 mb-3">Quản lý</h2>
      </div>
      <div className="manage row">
        <div className="col-6">
          <Researchers />
        </div>
        <div className="col-6">
          <Departments />
        </div>
      </div>
      <div className="project">
        <div className="title">
          <h2 className="text-danger text-center mt-5 mb-3"> Đăng ký dự án </h2>
        </div>
        <Project />
      </div>
    </div>
  );
};

export default Manage;

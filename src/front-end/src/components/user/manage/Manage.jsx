import React from "react";
import Researchers from "./researchers/Researcher";
import Departments from "./departments/Department";

const Manage = () => {
  return (
    <div className="container">
      <div className="title">
        <h2 className="text-danger text-center mt-5 mb-3">Quản lý</h2>
      </div>
      <div className="manage row">
        <div className="col-6">
          <Researchers/>
        </div>
        <div className="col-6">
          <Departments/>
        </div>
      </div>
    </div>
  );
};

export default Manage;

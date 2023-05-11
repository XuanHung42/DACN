import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import DashboardAdmin from "../dashboard/Dashboard";

const LayoutAdmin = () => {
  return (
    <>
      <div className="layout-admin">
        <div className="row">
          <Navbar />
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
            <DashboardAdmin/>
          </div>
        </div>
      </div>
    </>
  );
};
export default LayoutAdmin;

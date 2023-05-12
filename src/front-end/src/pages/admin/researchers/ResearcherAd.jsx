import React from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";



const ResearchAdmin = () => {
  return (
    <>
      <div className="row">
          <Navbar />
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
            <h1>Đây là khu vực quản lý nhà khoa học</h1>
          </div>
        </div>
    </>
  )
}
export default ResearchAdmin;
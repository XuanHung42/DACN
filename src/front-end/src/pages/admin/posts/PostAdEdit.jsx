import React from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";



const PostAdminEdit = () => {
  return (
    <>
      <div className="row">
        <Navbar />
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div className="title py-3 text-danger">
            <h3>Quản lý bài đăng</h3>
          </div>
          <div className="post-content">

          </div>
        </div>
      </div>
    </>
  )
}
export default PostAdminEdit;
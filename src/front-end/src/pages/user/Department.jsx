import React from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import DepartmentManage from "../../components/user/manage/departments/DepartmentManage";


const Department = () => {
  return (
    <>
      <Header/>
      <div className="container">
        <DepartmentManage/>
      </div>
      <Footer/>
    </>
  )
}
export default Department;
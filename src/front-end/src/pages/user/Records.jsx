import React from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import ResearcherManage from "../../components/user/manage/researchers/ResearcherManage";



const Record = () => {
  return (
    <>
      <Header/>
      <div className="container">
        <ResearcherManage/>
      </div>
      <Footer/>
    </>
  )
}
export default Record;
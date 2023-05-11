import React from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import ResearchResult from "../../components/user/manage/result/ResearchResult";



const Research = () => {
  return (
    <>
      <Header/>
      <div className="container">
        <ResearchResult/>
      </div>
      <Footer/>
    </>
  )
}
export default Research;
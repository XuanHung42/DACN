import React, { useEffect } from "react";
import Header from "../../components/user/common/Header";
import Banner from "../../components/user/banner/Banner";
import Wellcome from "../../components/user/banner/Wellcome";
import SearchBox from "../../components/user/search/SearchBox";
import Footer from "../../components/user/common/Footer";
import Manage from "../../components/user/home/Manage";
import Intro from "./Intro";


const Home = () =>{
  useEffect(() => {
    document.title = "Trang chủ";
  }, [])

  return(
    <div>
      <Header/>
      <div className="banner">
        <Banner/>
      </div>
      <div className="container">
        <div className="wellcome mt-3">
          <Wellcome/>
        </div>
        <div className="search">
          <SearchBox/>
        </div>
        <div className="manage">
          <Manage/>
        </div>
        <div className="intro">
          <Intro/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default Home;
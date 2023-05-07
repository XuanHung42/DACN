import React from "react";
import bannerImg from "../image/banner_dlu.png";
import "../styles/banner.scss"


const Banner = () => {
  return (
    <>
      <div className="banner">
        <img src={bannerImg} className="banner-img" alt="banner"/>
      </div>
    </>
  )
}
export default Banner;


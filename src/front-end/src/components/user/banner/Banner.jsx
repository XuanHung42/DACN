import React from "react";
import bannerImg from "../image/banner_dlu.png";
import "../styles/banner.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    // slider auto scroll
    autoplay: {
      delay: 3000, // delay 3s
      disableOnInteraction: false,
    },
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <img src={bannerImg} className="banner-img" alt="banner" />
        </div>
        <div>
          <img src={bannerImg} className="banner-img" alt="banner" />
        </div>
      </Slider>
    </>
  );
};
export default Banner;

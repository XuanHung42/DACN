import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/style.scss";
import slide1 from "./image/1.png";
import slide2 from "./image/2.jpg";
import slide3 from "./image/3.png";

const Intro = () => {
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
      <div className="container">
        <div className="title">
          <h2 className="text-danger text-center mt-5 mb-3">Tin tức</h2>
        </div>
        <div className="image-banner">
          <Slider {...settings}>
            <div>
              <img src={slide1} alt="slide 1" className="image_slide" />
            </div>
            <div>
              <img src={slide2} alt="slide 2" className="image_slide" />
            </div>
            <div>
              <img src={slide3} alt="slide 3" className="image_slide" />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};
export default Intro;

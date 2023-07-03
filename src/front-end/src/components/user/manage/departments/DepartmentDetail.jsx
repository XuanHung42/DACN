import React, { useState } from "react";
import { getDepartmentBySlug } from "../../../../api/DepartmentApi";
import { useParams } from "react-router-dom";
import Layout from "../../common/Layout";
import { Tab, Tabs } from "react-bootstrap";
import UserInDepartment from "./UserInDepartment";
import PostInDepartment from "./PostsInDepartment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../image/1.png";
import slide2 from "../../image/3.png";
import slide3 from "../../image/5.png";
import slide4 from "../../image/6.jpg";

import "../Manage.scss";

const DepartmentDetail = () => {
  const params = useParams();
  const [departmentDetail, setDepartmentDetail] = useState([]);

  const { slug } = params;

  useState(() => {
    document.title = "Chi tiết khoa";
    window.scroll(0, 0);

    getDepartmentBySlug(slug).then((data) => {
      if (data) {
        setDepartmentDetail(data);
      } else {
        setDepartmentDetail({});
      }
    });
  }, [slug]);

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
    <Layout>
      <div className="title py-3 text-danger text-center mt-3">
        <h2>Chào mừng bạn đến với khoa {departmentDetail.name}</h2>
      </div>
      <div className="department-content">
        <Tabs className="mb-3">
          <Tab eventKey="intro" title="Giới thiệu">
            <h3 className="text-danger py-3">
              Phòng khoa: {departmentDetail.name}
            </h3>
            <div className="image-banner">
              <Slider {...settings}>
                <div>
                  <img src={slide1} alt="slide 1" className="image_slide" />
                </div>
                <div>
                  <img src={slide2} alt="slide 2" className="image_slide" />
                </div>
                <div>
                  <img src={slide3} alt="slide 2" className="image_slide" />
                </div>
                <div>
                  <img src={slide4} alt="slide 2" className="image_slide" />
                </div>
              </Slider>
            </div>
          </Tab>
          <Tab eventKey="users" title="Nhân sự khoa">
            <UserInDepartment />
          </Tab>
          <Tab eventKey="post" title="Công trình khoa học">
            <PostInDepartment />
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};
export default DepartmentDetail;

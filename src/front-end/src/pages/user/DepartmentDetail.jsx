import React, { useEffect, useState } from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import {
  getAllDepartment,
  getDepartmentBySlug,
} from "../../api/DepartmentApi";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const DepartmentDetail = () => {
  const params = useParams();
  const [departmentList, setDepartmentList] = useState([]);
  const [departmentDetail, setDepartmentDetail] = useState(null);
  const { slug } = params;

  useEffect(() => {
    document.title = "Chi tiết đơn vị khoa";
    getDepartmentBySlug(slug).then((data) => {
      window.scroll(0, 0);
      if (data) {
        setDepartmentDetail(data);
        console.log("data detail: ", data);
      } else {
        setDepartmentDetail({});
      }
    });
  }, [slug]);

  useEffect(() => {
    getAllDepartment().then((data) => {
      if (data) {
        console.log("data check: ", data);
        setDepartmentList(data);
      } else {
        setDepartmentList([]);
      }
    });
  }, []);

  if (departmentDetail) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="department-title py-3">
            <h1 className="text-danger text-center">
              Chi tiết đơn vị khoa {departmentDetail.name}
            </h1>
          </div>
          <div className="department-detail">
            <div className="text-name">Khoa: {departmentDetail.name}</div>
            <Tabs className="mb-3">
              <Tab eventKey="intro" title="Giới thiệu">
                2
              </Tab>
              <Tab eventKey="users" title="Nhà khoa học">
                {departmentList.map((item, index) => (
                  <div key={index}>
                    {item.name}
                    {item.users.map((users, i) => (
                      <div key={i}>
                        <h2>{users.name}</h2>
                        <p>{users.email}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </Tab>
              <Tab eventKey="post" title="Bài đăng">
                2
              </Tab>
            </Tabs>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return <></>;
  }
};
export default DepartmentDetail;

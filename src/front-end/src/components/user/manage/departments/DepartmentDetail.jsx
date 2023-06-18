import React, { useState } from "react";
import { getDepartmentBySlug } from "../../../../api/DepartmentApi";
import { useParams } from "react-router-dom";
import Layout from "../../common/Layout";
import { Tab, Tabs } from "react-bootstrap";
import UserInDepartment from "./UserInDepartment";
import PostInDepartment from "./PostsInDepartment";

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

  return (
    <Layout>
      <div className="title py-3 text-danger text-center mt-3">
        <h2>Chào mừng bạn đến với khoa {departmentDetail.name}</h2>
      </div>
      <div className="department-content">
        <Tabs className="mb-3">
          <Tab eventKey="intro" title="Giới thiệu">
            <div className="text-danger">
              Phòng khoa: {departmentDetail.name}
            </div>
          </Tab>
          <Tab eventKey="users" title="Nhân sự khoa">
            <UserInDepartment/>
          </Tab>
          <Tab eventKey="post" title="Công trình khoa học">
            <PostInDepartment/>
          </Tab>
        </Tabs>
        
      </div>
    </Layout>
  );
};
export default DepartmentDetail;

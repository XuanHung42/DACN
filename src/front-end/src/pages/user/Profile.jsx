import React, { useEffect, useState } from "react";
import Layout from "../../components/user/common/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserResearchertById } from "../../api/UserApi";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import "./styles/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Profile = () => {
  const initialState = {
    id: 0,
    urlSlug: "",
    name: "",
    email: "",
    imageUrl: "",
    birthDate: "",
    departmentName: "",
  };

  const [userResearcher, setUserResearcher] = useState(initialState);
  let { id } = useParams();
  id = id ?? 0;

  const getImage = (path) => {
    console.log(path);
    if (!path) {
      // set default image
      return `https://placehold.co/200x200?text=Image-not-found`;
    }

    return `https://localhost:7284/${path}`;
  };
  

  useEffect(() => {
    document.title = "Trang cá nhân";

    getUserResearchertById(id).then((data) => {
      if (data) {
        setUserResearcher({
          ...data,
        });
      } else {
        setUserResearcher(initialState);
      }
    });
  }, []);


  return (
    <Layout>
      <div className="container">
        <Tabs className="mb-3 mt-5">
          <Tab eventKey="users" title="Hồ sơ của bạn">
            <h3 className="text-success py-3 text-center">
              Thông tin hồ sơ của bạn
            </h3>

            <div className="text-center avata">
              <img
                src={getImage(userResearcher.imageUrl)}
                alt=""
                className="rounded-circle"
              />
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <Form.Label className="col-sm-6 col-form-label">
                  Họ tên của bạn
                </Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  name="name"
                  title="Name"
                  required
                  value={userResearcher.name}
                />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-sm-6">
                <Form.Label className="col-sm-6 col-form-label">
                  Email của bạn
                </Form.Label>
                <Form.Control
                  type="Email"
                  disabled
                  name="email"
                  title="Email"
                  required
                  value={userResearcher.email}
                />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-sm-6">
                <Form.Label className="col-sm-6 col-form-label">
                  Ngày sinh
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  disabled
                  name="birthDate"
                  title="BirthDate"
                  required
                  value={userResearcher.birthDate}
                />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-sm-6">
                <Form.Label className="col-sm-6 col-form-label">
                  Thuộc khoa
                </Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  name="departmentName"
                  title="departmentName"
                  required
                  value={userResearcher.departmentName}
                />
              </div>
            </div>

            <div className="text-center mt-5">
              <Link
                to={`/profile/edit/${userResearcher.id}`}
                className="btn btn-success ms-2"
              >
                Sửa hồ sơ
                <FontAwesomeIcon icon={faPen} className="px-2" />
              </Link>
              <Link to="/" className="btn btn-danger ms-2">
                Thoát
                <FontAwesomeIcon icon={faSignOut} className="px-2" />
              </Link>
            </div>
          </Tab>
          <Tab eventKey="posts" title="Đăng bài báo">
            
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};
export default Profile;

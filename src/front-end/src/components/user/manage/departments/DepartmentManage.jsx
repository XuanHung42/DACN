import React, { useEffect, useState } from "react";
import { getAllDepartment } from "../../../../api/DepartmentApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../Manage.scss";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { format } from "date-fns";
import Loading from "../../Loading";

const DepartmentManage = () => {
  const [getDepartment, setDepartment] = useState([]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  useEffect(() => {
    getAllDepartment().then((data) => {
      if (data) {
        setDepartment(data);
        console.log("data check tab: ", data);
      } else {
        setDepartment([]);
      }
      setIsVisibleLoading(false);
    });
  }, []);

  return (
    <>
      <div className="department">
        <div className="department-title py-3">
          <h1 className="text-danger text-center mt-3 mb-3">
            Quản lý phòng khoa
          </h1>
        </div>

        {isVisibleLoading ? (
          <Loading />
        ) : (
          <>
            <Tabs id="fill-tab-example" className="mb-5" fill>
              {getDepartment.length > 0 ? (
                getDepartment.map((item, index) => (
                  <Tab eventKey={item.urlSlug} title={item.name} key={index}>
                    <h3 className="text-success text-center mb-3">
                      Chi tiết phòng khoa
                    </h3>

                    <Tabs className="mb-5">
                      <Tab title="Giới thiệu" key={index} eventKey="intro">
                        <h5 className="text-danger">Phòng khoa: {item.name}</h5>
                      </Tab>
                      <Tab
                        title="Nhà khoa học"
                        key={index}
                        eventKey="researcher"
                      >
                        <div className="row">
                          {item.users.map((users, i) => (
                            <div className="col-6" key={i}>
                              <div className="card mt-3">
                                <div className="d-flex card-content">
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    fontSize={50}
                                    className="px-3 text-success"
                                  />
                                  <div className="d-flex flex-column">
                                    <Link
                                      className="text-success text-decoration-none"
                                      to={`researcher/${users.urlSlug}`}
                                    >
                                      <div className="text-name">
                                        Họ tên: {users.name}
                                      </div>
                                    </Link>
                                    <Link
                                      className="text-danger text-decoration-none"
                                      to={`mailto:${users.email}`}
                                    >
                                      Email: {users.email}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab>
                      <Tab title="Bài đăng" key={index} eventKey="posts">
                        <div className="row">
                          {item.posts.map((posts, i) => (
                            <div className="col-6" key={i}>
                              <div className="card-content mt-1">
                                <Link
                                  className="text-decoration-none"
                                  to={posts.urlSlug}
                                >
                                  <h3>{posts.title}</h3>
                                </Link>
                                <p className="card-shortdesc">
                                  {posts.shortDescription}
                                </p>
                                <div className="card-author">
                                  <span className="card-author-title">
                                    Đăng bởi:
                                  </span>
                                  <Link
                                    className="text-decoration-none px-2"
                                    to={`researcher/${posts.user.name}`}
                                  >
                                    <span className="card-author-name">
                                      {posts.user.name}
                                    </span>
                                  </Link>
                                  <span className="px-5">
                                    Đăng ngày:
                                    {format(
                                      new Date(posts.created),
                                      "dd/MM/yyyy hh:mm"
                                    )}
                                  </span>
                                  <span>
                                    Lượt xem: 
                                    {posts.viewCount}
                                    <FontAwesomeIcon icon={faEye} className="text-danger px-1"/>
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab>
                    </Tabs>
                  </Tab>
                ))
              ) : (
                <>
                  <h2 className="text-warning text-center py-3">
                    Không tìm thấy thông tin phòng khoa nào
                  </h2>
                </>
              )}
            </Tabs>
          </>
        )}
      </div>
    </>
  );
};

export default DepartmentManage;

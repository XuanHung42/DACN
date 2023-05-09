import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { getAllDepartment } from "../../../../api/Department";
import { getAllUser } from "../../../../api/UserApi";

const ResearcherManage = () => {
  const [departmentManage, setDepartmentManage] = useState([]);
  const [userManage, setUserManage] = useState([]);

  useEffect(() => {
    getAllDepartment().then((data) => {
      if (data) {
        setDepartmentManage(data);
        // console.log("data department: ", data);
      } else {
        setDepartmentManage([]);
      }
    });

    getAllUser().then((data) => {
      if (data) {
        setUserManage(data);
        // console.log("data user: ", data);

      } else {
        setUserManage([]);
      }
    });
  }, []);

  return (
    <>
      <div className="researcher">
        <div className="researcher-title py-3">
          <h1 className="text-danger text-center">Hồ sơ khoa học </h1>
        </div>
        <Tabs className="mb-3">
          <Tab eventKey="users" title="Tác giả">
            <div className="row">
              {userManage.map((item, index) => (
                <div className="col-6" key={index}>
                  <div className="card mt-3">
                    <div className="d-flex card-content">
                      <FontAwesomeIcon
                        icon={faUser}
                        fontSize={50}
                        className="px-3 text-success"
                      />
                      <Link
                        className="text-success text-decoration-none"
                        to={item.urlSlug}
                      >
                        <div className="text-name">Họ tên: {item.name}</div>
                        <span className="text-danger">Email: {item.email}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="post" title="Đơn vị">
            <div className="row">
              {departmentManage.map((item, index) => (
                <div className="col-6" key={index}>
                  <div className="card mt-3">
                    <div className="d-flex card-content">
                      <FontAwesomeIcon
                        icon={faHome}
                        fontSize={50}
                        className="px-3 text-success"
                      />
                      <Link
                        className="text-success text-decoration-none"
                        to={item.urlSlug}
                      >
                        <div className="text-name">{item.name}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
export default ResearcherManage;

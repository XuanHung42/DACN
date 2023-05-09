import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Loading from "../../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { getAllDepartment } from "../../../../api/Department";
import { getAllUser, getFilterResearch } from "../../../../api/UserApi";
import { useSelector } from "react-redux";
import ResearchFilter from "../../filter/ResearcherFilterModel";

const ResearcherManage = () => {
  const [departmentManage, setDepartmentManage] = useState([]);
  const [userManage, setUserManage] = useState([]);

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    researcherFilter = useSelector((state) => state.researcherFilter);

  let { id } = useParams,
    p = 1,
    ps = 10;

  // useEffect(() => {
  //   getAllDepartment().then((data) => {
  //     if (data) {
  //       setDepartmentManage(data);
  //       // console.log("data department: ", data);
  //     } else {
  //       setDepartmentManage([]);
  //     }
  //   });

  //   getAllUser().then((data) => {
  //     if (data) {
  //       setUserManage(data);
  //       // console.log("data user: ", data);

  //     } else {
  //       setUserManage([]);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    getFilterResearch(researcherFilter.name, researcherFilter.email).then(
      (data) => {
        if (data) {
          setUserManage(data.items);
        } else {
          setUserManage([]);
        }
        setIsVisibleLoading(false);
      }
    );
  }, [researcherFilter, ps, p]);

  return (
    <>
      <div className="researcher">
        <div className="researcher-title py-3">
          <h1 className="text-danger text-center">Hồ sơ khoa học </h1>
        </div>
        <Tabs className="mb-3">
          <Tab eventKey="users" title="Tác giả">
            <div className="text-end">
              <ResearchFilter />
            </div>
            {isVisibleLoading ? (
              <Loading />
            ) : (
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
                          <span className="text-danger">
                            Email: {item.email}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* <div className="row">
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
            </div> */}
          </Tab>
          <Tab eventKey="post" title="Đơn vị khoa">
            {/* <div className="row">
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
            </div> */}
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
export default ResearcherManage;

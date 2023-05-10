import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Loading from "../../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  getFilterDepartment,
} from "../../../../api/DepartmentApi";
import { getFilterResearch } from "../../../../api/UserApi";
import { useSelector } from "react-redux";
import ResearchFilter from "../../filter/ResearcherFilterModel";
import DepartmentFilter from "../../filter/DepartmentFilterModel";

const ResearcherManage = () => {
  const [userManage, setUserManage] = useState([]);
  const [departmentManage, setDepartmentManage] = useState([]);

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    researcherFilter = useSelector((state) => state.researcherFilter),
    departmentFilter = useSelector((state) => state.departmentFilter);

  let { id } = useParams,
    p = 1,
    ps = 10;

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

  useEffect(() => {
    getFilterDepartment(departmentFilter.name).then((data) => {
      if (data) {
        setDepartmentManage(data.items);
      } else {
        setDepartmentManage([]);
      }
      setIsVisibleLoading(false);
    });
  }, [departmentFilter, ps, p]);

  return (
    <>
      <div className="researcher">
        <div className="researcher-title py-3">
          <h1 className="text-danger text-center">Hồ sơ khoa học </h1>
        </div>
        <Tabs className="mb-3">
          <Tab eventKey="users" title="Tất cả tác giả">
            <ResearchFilter />
            {isVisibleLoading ? (
              <Loading />
            ) : (
              <div className="row">
                {userManage.length > 0 ? (
                  userManage.map((item, index) => (
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
                            to={`researcher/${item.urlSlug}`}
                          >
                            <div className="text-name">Họ tên: {item.name}</div>
                            <span className="text-danger">
                              Email: {item.email}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2 className="text-warning text-center py-3">
                    Không tìm thấy nhà khoa học
                  </h2>
                )}
              </div>
            )}
          </Tab>
          <Tab eventKey="post" title="Tất cả đơn vị khoa">
            <DepartmentFilter/>
            {isVisibleLoading ? (
              <Loading />
            ) : (
              <div className="row">
                {departmentManage.length > 0 ? (
                  departmentManage.map((item, index) => (
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
                  ))
                ) : (
                  <h2 className="text-warning text-center py-3">
                    Không tìm thấy đơn vị khoa
                  </h2>
                )}
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
export default ResearcherManage;

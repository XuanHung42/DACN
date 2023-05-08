import React, { useEffect, useState } from "react";
import { getAllDepartment } from "../../../../api/Department";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../Manage.scss";

const DepartmentManage = () => {
  const [getDepartment, setGetDepartment] = useState([]);

  useEffect(() => {
    getAllDepartment().then((data) => {
      if (data) {
        setGetDepartment(data);
        // console.log("data: ", data);
      } else {
        setGetDepartment([]);
      }
    });
  }, []);

  return (
    <>
      <div className="department">
        <div className="department-title py-3">
          <h1 className="text-danger text-center">Đơn vị khoa</h1>
        </div>
        <div className="department-body row">
          {getDepartment.map((item, index) => (
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
      </div>
    </>
  );
};
export default DepartmentManage;

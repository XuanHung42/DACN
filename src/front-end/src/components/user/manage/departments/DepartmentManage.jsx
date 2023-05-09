import React, { useEffect, useState } from "react";
import {
  getFilterDepartment,
} from "../../../../api/Department";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import "../Manage.scss";
import DepartmentFilter from "../../filter/DepartmentFilterModel";
import { useSelector } from "react-redux";
import Loading from "../../Loading";

const DepartmentManage = () => {
  const [getDepartment, setGetDepartment] = useState([]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    departmentFilter = useSelector((state) => state.departmentFilter);


    let { id } = useParams,
    p = 1,
    ps = 10;
  
  useEffect(() => {
    getFilterDepartment(departmentFilter.name).then((data) => {
      if (data) {
        setGetDepartment(data.items);
      } else {
        setGetDepartment([]);
      }
      setIsVisibleLoading(false);
    });
  }, [departmentFilter, ps, p]);

  return (
    <>
      <div className="department">
        <div className="department-title py-3">
          <h1 className="text-danger text-center">Đơn vị khoa</h1>
        </div>
        <>
          <DepartmentFilter />
          {isVisibleLoading ? (
            <Loading />
          ) : (
            <div className="row">
              {getDepartment.length > 0 ? (
                getDepartment.map((item, index) => (
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
                  Không tìm thấy phòng khoa
                </h2>
              )}
            </div>
          )}
        </>
      </div>
    </>
  );
};
export default DepartmentManage;

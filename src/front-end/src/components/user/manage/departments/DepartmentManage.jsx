import React, { useEffect, useState } from "react";
import {
  getAllDepartment,
  getFilterDepartment,
} from "../../../../api/DepartmentApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import "../Manage.scss";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { format } from "date-fns";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import Pager from "../../../pager/Pager";
import DepartmentFilter from "../../filter/DepartmentFilterModel";

const DepartmentManage = () => {
  const [departmentManage, setDepartmentManage] = useState([]);

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    departmentFilter = useSelector((state) => state.departmentFilter);
  const [metadata, setMetadata] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  let { id } = useParams,
    p = 1,
    ps = 4;
  function updatePageNumber(inc) {
    setPageNumber((currentVal) => currentVal + inc);
  }
  useEffect(() => {
    document.title = "Hồ sơ khoa học";
    loadResearch();
    async function loadResearch() {
      function setData(props) {
        setDepartmentManage(props.items);
        setMetadata(props.metadata);
      }

      getFilterDepartment(departmentFilter.name, ps, pageNumber).then(
        (data) => {
          if (data) {
            setData(data);
          } else {
            setData([]);
          }
          setIsVisibleLoading(false);
        }
      );
    }
  }, [departmentFilter, ps, p, pageNumber]);

  return (
    <>
      <div className="department">
        <div className="department-title py-3">
          <h1 className="text-danger text-center mt-3 mb-3">
            Quản lý phòng khoa
          </h1>
        </div>
        <DepartmentFilter />
        {isVisibleLoading ? (
          <Loading />
        ) : (
          <>
            <div className="row">
              {departmentManage.length > 0 ? (
                departmentManage.map((item, index) => (
                  <div className="col-6" key={index}>
                    <div className="mt-3 card-content d-flex flex-row justify-content-between">
                      <div className="d-flex">
                        <FontAwesomeIcon
                          icon={faHome}
                          fontSize={50}
                          className="px-3 text-success"
                        />
                        <Link
                          className="text-success text-decoration-none d-flex align-items-center"
                          to={`/department/${item.urlSlug}`}
                        >
                          <div className="text-name">{item.name}</div>
                        </Link>
                      </div>
                      <div className="text-danger d-flex align-items-center">
                        Số giảng viên
                        <div className="cicler text-white">
                          {item.countUser}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-warning text-center py-3">
                  Không tìm thấy đơn vị
                </h2>
              )}
            </div>
            <Pager metadata={metadata} onPageChange={updatePageNumber} />
          </>
        )}
      </div>
    </>
  );
};

export default DepartmentManage;

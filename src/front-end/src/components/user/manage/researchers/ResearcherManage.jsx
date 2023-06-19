import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Loading from "../../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getFilterResearch } from "../../../../api/UserApi";
import { useSelector } from "react-redux";
import ResearchFilter from "../../filter/ResearcherFilterModel";

import Pager from "../../../pager/Pager";
import DepartmentManage from "../departments/DepartmentManage";

const ResearcherManage = () => {
  const [userManage, setUserManage] = useState([]);

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    researcherFilter = useSelector((state) => state.researcherFilter);

  const [metadata, setMetadata] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  let { id } = useParams,
    p = 1,
    ps = 6;

  useEffect(() => {
    document.title = "Hồ sơ khoa học";
    loadResearch();

    async function loadResearch() {
      function setData(props) {
        setUserManage(props.items);
        setMetadata(props.metadata);
      }
      getFilterResearch(
        researcherFilter.name,
        researcherFilter.email,
        ps,
        pageNumber
      ).then((data) => {
        if (data) {
          setData(data);
        } else {
          setData([]);
        }
        setIsVisibleLoading(false);
      });
    }
  }, [researcherFilter, ps, p, pageNumber]);

  function updatePageNumber(inc) {
    setPageNumber((currentVal) => currentVal + inc);
  }

  return (
    <>
      <div className="researcher">
        <div className="researcher-title py-3">
          <h1 className="text-danger text-center">Hồ sơ khoa học</h1>
        </div>
        <ResearchFilter />
        {isVisibleLoading ? (
          <Loading />
        ) : (
          <>
            <div className="row">
              {userManage.length > 0 ? (
                userManage.map((item, index) => (
                  <div className="col-6 " key={index}>
                    <div className="card mt-3 card-content d-flex flex-row justify-content-between">
                      <div className="d-flex">
                        <FontAwesomeIcon
                          icon={faUser}
                          fontSize={50}
                          className="px-3 text-success"
                        />
                        <div className="d-flex flex-column">
                          <Link
                            className="text-success text-decoration-none"
                            to={`${item.urlSlug}`}
                          >
                            <div className="text-name">Họ tên: {item.name}</div>
                          </Link>

                          {item.email === null ? (
                            <span className="text-danger">
                              Email: Tác giả chưa cập nhật email
                            </span>
                          ) : (
                            <Link
                              className="text-danger text-decoration-none"
                              to={`mailto:${item.email}`}
                            >
                              Email: {item.email}
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="text-danger d-flex align-items-center">
                        Số bài đăng
                        <div className="cicler text-white">
                          {item.countPost}
                        </div>
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
            <Pager metadata={metadata} onPageChange={updatePageNumber} />
          </>
        )}
      </div>
    </>
  );
};
export default ResearcherManage;

import {
  faArrowCircleUp,
  faBook,
  faCircleCheck,
  faCode,
  faCodeBranch,
  faDashboard,
  faHomeAlt,
  faPen,
  faPhone,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "../stylead.scss";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <ul>
          <div className="sidebar-main">
            <span className="sidebar-tile">Bảng điều khiển</span>
            <Link className="sidebar-link" to={`/admin`}>
              <li>
                <FontAwesomeIcon icon={faDashboard} />
                <span className="px-3">Dashboard</span>
              </li>
            </Link>
          </div>

          <div className="sidebar-main">
            <span className="sidebar-tile">Quản lý</span>
            <div className="sidebar-wrapper">
              <Link className="sidebar-link" to={`/admin/researcher`}>
                <li>
                  <FontAwesomeIcon icon={faUser} />
                  <span className="px-3">Nhà khoa học</span>
                </li>
              </Link>
            </div>
            <div className="sidebar-wrapper">
              <Link className="sidebar-link" to={`/admin/project`}>
                <li>
                  <FontAwesomeIcon icon={faBook} />
                  <span className="px-3">Dự án</span>
                </li>
              </Link>
            </div>

            <div className="sidebar-wrapper">
              <Link className="sidebar-link" to={`/admin/post`}>
                <li>
                  <FontAwesomeIcon icon={faPen} />
                  <span className="px-3">Đăng bài</span>
                </li>
              </Link>
            </div>

            <div className="sidebar-wrapper">
              <Link className="sidebar-link" to={`/admin/department`}>
                <li>
                  <FontAwesomeIcon icon={faHomeAlt} />
                  <span className="px-3">Phòng khoa</span>
                </li>
              </Link>
            </div>
            <div className="sidebar-wrapper">
              <Link className="sidebar-link" to={`/admin/process`}>
                <li>
                  <FontAwesomeIcon icon={faArrowCircleUp} />
                  <span className="px-3">Tiến độ</span>
                </li>
              </Link>
            </div>
            <div className="sidebar-wrapper">
              <Link className="sidebar-link" to={`/admin/topic`}>
                <li>
                  <FontAwesomeIcon icon={faCodeBranch} />
                  <span className="px-3">Lĩnh vực</span>
                </li>
              </Link>
            </div>
          </div>

          <div className="sidebar-main">
            <span className="sidebar-tile">Cài đặt</span>
            <div className="sidebar-wrapper">
              <Link className="sidebar-link" to={`/`}>
                <li>
                  <FontAwesomeIcon icon={faSignOut} />
                  <span className="px-3">Đăng xuất</span>
                </li>
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;

import {
  faArrowCircleUp,
  faBook,
  faCircleCheck,
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
            <span className="sidebar-tile">Main</span>
            <Link className="sidebar-link" to={`/admin`}>
              <li>
                <FontAwesomeIcon icon={faDashboard} />
                <span className="px-3">Dashboard</span>
              </li>
            </Link>
          </div>

          <div className="sidebar-main">
            <span className="sidebar-tile">List</span>
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
              <Link className="sidebar-link">
                <li>
                  <FontAwesomeIcon icon={faPen} />
                  <span className="px-3">Bài đăng</span>
                </li>
              </Link>
            </div>

            <div className="sidebar-wrapper">
              <Link className="sidebar-link">
                <li>
                  <FontAwesomeIcon icon={faHomeAlt} />
                  <span className="px-3">Phòng khoa</span>
                </li>
              </Link>
            </div>
            <div className="sidebar-wrapper">
              <Link className="sidebar-link">
                <li>
                  <FontAwesomeIcon icon={faArrowCircleUp} />
                  <span className="px-3">Tiến trình</span>
                </li>
              </Link>
            </div>
            <div className="sidebar-wrapper">
              <Link className="sidebar-link">
                <li>
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="px-3">Liên hệ</span>
                </li>
              </Link>
            </div>
          </div>

          <div className="sidebar-main">
            <span className="sidebar-tile">Service</span>
            <div className="sidebar-wrapper">
              <Link className="sidebar-link">
                <li>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span className="px-3">Cài đặt</span>
                </li>
              </Link>
            </div>
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

import {
  faArrowCircleUp,
  faBackwardFast,
  faBook,
  faBookOpen,
  faCircleCheck,
  faDashboard,
  faHomeAlt,
  faPen,
  faPhone,
  faPodcast,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar bg-danger text-white h-100">
        <ul>
          <p className="sidebar-tile">Main</p>
          <Link className="text-decoration-none" to={`/admin`}>
            <li>
              <FontAwesomeIcon icon={faDashboard} />
              <span className="px-3">Dashboard</span>
            </li>
          </Link>
          <p className="sidebar-tile">List</p>
          <Link className="text-decoration-none" to={`/admin/researcher`}>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <span className="px-3">Nhà khoa học</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/project`}>
            <li>
              <FontAwesomeIcon icon={faBook} />
              <span className="px-3">Dự án</span>
            </li>
          </Link>
          <Link className="text-decoration-none">
            <li>
              <FontAwesomeIcon icon={faPen} />
              <span className="px-3">Bài đăng</span>
            </li>
          </Link>
          <Link className="text-decoration-none">
            <li>
              <FontAwesomeIcon icon={faHomeAlt} />
              <span className="px-3">Phòng khoa</span>
            </li>
          </Link>
          <Link className="text-decoration-none">
            <li>
              <FontAwesomeIcon icon={faArrowCircleUp} />
              <span className="px-3">Tiến trình</span>
            </li>
          </Link>
          <Link className="text-decoration-none">
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <span className="px-3">Liên hệ</span>
            </li>
          </Link>
          <p className="sidebar-tile">Service</p>
          <Link className="text-decoration-none">
            <li>
              <FontAwesomeIcon icon={faCircleCheck} />
              <span className="px-3">Cài đặt</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/`}>
            <li>
              <FontAwesomeIcon icon={faSignOut} />
              <span className="px-3">Đăng xuất</span>
            </li>
          </Link>
          
        </ul>
      </div>
    </>
  );
};
export default Sidebar;

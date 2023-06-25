import {
  faBook,
  faBridge,
  faHome,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getAllDashboard } from "../../../api/DashboardApi";
import LayoutAdmin from "../layout/LayoutAd";

const DashboardAdmin = () => {
  const [dashboardItem, setDashboardItem] = useState({});

  useEffect(() => {
    document.title = "Trang quản trị hệ thống"
    getDashboard();
    async function getDashboard() {
      const response = await getAllDashboard();
      if (response) {
        console.log("response check: ", response);
        setDashboardItem(response);
      } else {
        setDashboardItem({});
      }
    }
  }, []);

  return (
    <LayoutAdmin>
      <div className="d-flex mt-5 ">
        <div className="card-body">
          <div className="text-success">
            <h5>Đăng bài</h5>
            <FontAwesomeIcon icon={faPen} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {dashboardItem.countPost}
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h5>Bài đăng chưa phê duyệt</h5>
            <FontAwesomeIcon icon={faPen} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {dashboardItem.countPostNotApprove}
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h5>Bài đăng đã phê duyệt</h5>
            <FontAwesomeIcon icon={faPen} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {dashboardItem.countPostApprove}
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex mt-5">
        <div className="card-body">
          <div className="text-success">
            <h5>Dự án</h5>
            <FontAwesomeIcon icon={faBook} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {dashboardItem.countProject}
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h5>Dự án chưa phê duyệt</h5>
            <FontAwesomeIcon icon={faBook} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {dashboardItem.countProjectNotRegister}
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h5>Dự án đã phê duyệt</h5>
            <FontAwesomeIcon icon={faBook} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {dashboardItem.countProjectRegister}
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex mt-5">
        <div className="card-body">
          <div className="text-success">
            <h5>Người dùng</h5>
            <FontAwesomeIcon icon={faUser} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {dashboardItem.countUser}
            </span>
          </div>
        </div>
        
        <div className="card-body">
          <div className="text-success">
            <h5>Phòng khoa</h5>
            <FontAwesomeIcon icon={faHome} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {dashboardItem.countDepartment}
            </span>
          </div>
        </div>
        
        <div className="card-body">
          <div className="text-success">
            <h5>Lĩnh vực</h5>
            <FontAwesomeIcon icon={faBridge} fontSize={30} />
            <span className="text-danger px-5 display-5">
              {/* {dashboardItem.countDepartment} */}
              4
            </span>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default DashboardAdmin;

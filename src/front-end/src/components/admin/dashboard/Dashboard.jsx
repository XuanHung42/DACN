import { faBook, faHome, faPen,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getAllDashboard } from "../../../api/DashboardApi";
import LayoutAdmin from "../layout/LayoutAd";



const DashboardAdmin = () => {
  const [dashboardItem, setDashboardItem] = useState({});

  useEffect(() => {
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
      <div className="d-flex mt-5">
        <div className="card-body">
          <div className="text-success">
            <h3>Người dùng</h3>
            <FontAwesomeIcon icon={faUser} fontSize={30} />
            <span className="text-danger px-5 display-6">{dashboardItem.countUser}</span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h3>Dự án</h3>
            <FontAwesomeIcon icon={faBook} fontSize={30} />
            <span className="text-danger px-5 display-6">{dashboardItem.countProject}</span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h3>Đăng bài</h3>
            <FontAwesomeIcon icon={faPen} fontSize={30} />
            <span className="text-danger px-5 display-6">{dashboardItem.countPost}</span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h3>Phòng khoa</h3>
            <FontAwesomeIcon icon={faHome} fontSize={30} />
            <span className="text-danger px-5 display-6">{dashboardItem.countDepartment}</span>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}
export default DashboardAdmin;
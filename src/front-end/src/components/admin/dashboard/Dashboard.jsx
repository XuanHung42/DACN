import { faFaceGrinHearts, faUser } from "@fortawesome/free-regular-svg-icons";
import { faList, faPhone, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";



const DashboardAdmin = () => {
  return (
    <>
      <div className="d-flex mt-5">
        <div className="card-body">
          <div className="text-success">
            <h3>Số user</h3>
            <FontAwesomeIcon icon={faUser} fontSize={30} />
            <span className="text-danger px-5 display-6">8</span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h3>Loại dịch vụ</h3>
            <FontAwesomeIcon icon={faList} fontSize={30} />
            <span className="text-danger px-5 display-6">8</span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h3>Dịch vụ</h3>
            <FontAwesomeIcon icon={faFaceGrinHearts} fontSize={30} />
            <span className="text-danger px-5 display-6">8</span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h3>Hỗ trợ</h3>
            <FontAwesomeIcon icon={faPhone} fontSize={30} />
            <span className="text-danger px-5 display-6">6</span>
          </div>
        </div>
        <div className="card-body">
          <div className="text-success">
            <h3>Đặt hàng</h3>
            <FontAwesomeIcon icon={faTruck} fontSize={30} />
            <span className="text-danger px-5 display-6">2</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default DashboardAdmin;
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "../Manage.scss"



const Researchers = () =>{
  return (
    <>
      <div className="card">
        <FontAwesomeIcon icon={faUsers} fontSize={80} className="text-danger py-3"/>
        <h5 className="text-success text-center">Nhà khoa học</h5>
        <div className="card-body">
          <div className="card-content">
            <Link className="text-decoration-none">
              <h6>Quá trình chuyển biến kinh tế xã hội của thành phố Đà Lạt</h6>
            </Link>
            <div className="card-shortdesc">Mô tả ngắn về bài báo nghiên cứu khoa học</div>
            <div className="card-author">
              <span className="card-author-title">Tác giả:</span>
              <Link className="text-decoration-none">
                <span className="card-author-name px-3">Duật Trần</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Researchers;
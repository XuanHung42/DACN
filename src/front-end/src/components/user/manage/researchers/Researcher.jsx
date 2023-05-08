import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Manage.scss"
import { getAllPost } from "../../../../api/PostApi.js";



const Researchers = () =>{
  const [getPost, setGetPost] = useState([]);

  useEffect(() => {
    getAllPost().then((data) => {
      console.log("data check: ", data);
      if(data){
        setGetPost(data);
      }
      else{
        setGetPost([]);
      }
    });
  }, []);


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
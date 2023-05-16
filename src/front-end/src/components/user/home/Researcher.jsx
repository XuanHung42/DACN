import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Manage.scss";
import { getAllLimitNewPost } from "../../../api/PostApi";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const Researchers = () => {
  const [getPost, setGetPost] = useState([]);

  useEffect(() => {
    getAllLimitNewPost().then((data) => {
      console.log("data check: ", data);
      if (data) {
        setGetPost(data);
      } else {
        setGetPost([]);
      }
    });
  }, []);

  return (
    <>
      <div className="card">
        <FontAwesomeIcon
          icon={faBookOpen}
          fontSize={80}
          className="text-danger py-3"
        />
        <h5 className="text-success text-center">Bài viết mới nhất</h5>
        <div className="card-body">
          {getPost.map((item, index) => (
            <div className="card-content mt-1" key={index}>
              <Link className="text-decoration-none" to={`/${item.urlSlug}`}>
                <h5>{item.title}</h5>
              </Link>
              <div className="card-shortdesc">{item.shortDescription}</div>
              <div className="card-author row">
                <div className="card-author-title col">
                  Đăng bởi:
                  <Link
                    className="text-decoration-none px-2"
                    to={`/home/${item.user.urlSlug}`}
                  >
                    {item.user.name}
                  </Link>
                </div>
                <div className="col"> 
                  Lượt xem: {item.viewCount} 
                  <FontAwesomeIcon icon={faEye} className="text-danger px-1"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Researchers;

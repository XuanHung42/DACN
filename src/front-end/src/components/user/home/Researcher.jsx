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
      <div className="card-container">
        <div className="text-center">
        <FontAwesomeIcon
          icon={faBookOpen}
          fontSize={80}
          className="text-danger py-3 text-center"
        />

        </div>
        <h5 className="text-success text-center">Bài viết mới nhất</h5>
        <div className="card-body">
          {getPost.map((item, index) => (
            <div className="card-content mt-3" key={index}>
              <Link className="text-decoration-none textline" to={`/${item.urlSlug}`}>
                <h5 className="text-success">{item.title}</h5>
              </Link>
              <div className="card-shortdesc mt-3">{item.shortDescription}</div>
              <div className="card-author row mt-2">
                <div className="card-author-title col">
                  Đăng bởi:
                  <Link
                    className="text-decoration-none px-2 text-danger"
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

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Manage.scss";
import { getAllPostByViewCount } from "../../../api/PostApi";

const Departments = () => {
  const [getPost, setGetPost] = useState([]);

  useEffect(() => {
    getAllPostByViewCount().then((data) => {
      // console.log("data check: ", data);
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
            icon={faEye}
            fontSize={80}
            className="text-danger py-3"
          />
        </div>
        <h5 className="text-success text-center">Xem nhiều nhất</h5>

        <div className="card-body">
          {getPost.map((item, index) => (
            <div className="card-content mt-3" key={index}>
              <Link className="text-decoration-none textline" to={`/${item.urlSlug}`}>
                <span className="text-success post-title">{item.title}</span>
              </Link>
              <div className="card-shortdesc pt-3">{item.shortDescription}</div>
              <div className="card-author row pt-2">
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

export default Departments;
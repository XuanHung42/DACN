import { faBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Manage.scss";
import { getAllPost } from "../../../api/PostApi";

const Departments = () => {
  const [getPost, setGetPost] = useState([]);

  useEffect(() => {
    getAllPost().then((data) => {
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
          icon={faBank}
          fontSize={80}
          className="text-danger py-3"
        />
        <h5 className="text-success text-center">Phòng Khoa</h5>

        <div className="card-body">
          {getPost.map((item, index) => (
            <div className="card-content mt-1" key={index}>
              <Link className="text-decoration-none">
                <h6>{item.title}</h6>
              </Link>
              <div className="card-shortdesc">{item.shortDescription}</div>
              <div className="card-author">
                <span className="card-author-title">Tác giả:</span>
                <Link className="text-decoration-none">
                  <span className="card-author-name px-3">
                    {item.user.name}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Departments;

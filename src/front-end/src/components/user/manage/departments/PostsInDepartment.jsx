import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostByDepartmentSlug } from "../../../../api/DepartmentApi";
import Loading from "../../Loading";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../Manage.scss";

const PostInDepartment = () => {
  const params = useParams();
  const [postDepartment, setpostDepartment] = useState([]);

  const { slug } = params;

  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  useEffect(() => {
    document.title = "Chi tiết khoa - Công trình khoa học";
    window.scroll(0, 0);

    getPostByDepartmentSlug(slug).then((data) => {
      if (data) {
        setpostDepartment(data.items);
      } else {
        setpostDepartment({});
      }
      setIsVisibleLoading(false);
    });
  }, [slug]);

  return (
    <>
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <>
          <div className="row">
            {postDepartment.length > 0 ? (
              postDepartment.map((item, index) => (
                <div className="col-6" key={index}>
                  <div className="card-content mt-1">
                    <Link
                      className="text-decoration-none text-none textline"
                      to={`/research/${item.urlSlug}`}
                    >
                      <h5>{item.title}</h5>
                    </Link>
                    <p className="card-shortdesc mt-3">{item.shortDescription}</p>
                    <div className="card-author">
                      <span className="card-author-title">Đăng bởi: </span>
                      <Link className="text-decoration-none">
                        <span className="card-author-name">
                          {item.user.name}
                        </span>
                      </Link>
                      <span className="px-5">
                        Đăng ngày:{" "}
                        {format(new Date(item.created), "dd/MM/yyyy")}
                      </span>
                      <span>
                        Lượt xem:
                        {item.viewCount}
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-danger px-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <h2 className="text-warning text-center py-3">
                  Không tìm thấy bài viết nào
                </h2>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default PostInDepartment;

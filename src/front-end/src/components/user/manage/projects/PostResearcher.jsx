import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostByResearchSlug } from "../../../../api/PostApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "../Manage.scss"

const PostResearcher = () => {
  const [post, setPost] = useState([]);
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    getPostByResearchSlug(slug).then((data) => {
      if (data) {
        setPost(data.items);
      } else {
        setPost({});
      }
    });
  }, [slug]);

  return (
    <>
      <div>
        <div className="department-title py-3">
          <h2 className="text-danger text-center">
            Bài báo được đăng bởi tác giả
          </h2>
        </div>
        <div className="row">
            {post.length > 0 ? (
              post.map((item, index) => (
                <div className="col-6" key={index}>
                  <div className="card-content mt-3">
                    <Link className="text-decoration-none textline" to={`/research/${item.urlSlug}`}>
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
                        {format(new Date(item.created), "dd/MM/yyyy hh:mm")}
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
      </div>
    </>
  );
};
export default PostResearcher;

import React, { useState } from "react";
import { useEffect } from "react";
import { getAllPost, getFilterPost } from "../../../../api/PostApi";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import PostFilter from "../../filter/PostFilterModel";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Pager from "../../../pager/Pager";

const ResearchResult = () => {
  const [getPost, setGetPost] = useState([]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    postFilter = useSelector((state) => state.postFilter);

  const [metadata, setMetadata] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  let { id } = useParams,
    p = 1,
    ps = 4;

  useEffect(() => {
    document.title = "Kết quả nghiên cứu";
    loadResearch();
    async function loadResearch() {
      function setData(props) {
        setGetPost(props.items);
        setMetadata(props.metadata);
      }
      getFilterPost(
        postFilter.title,
        postFilter.shortDescription,
        ps,
        pageNumber
      ).then((data) => {
        if (data) {
          setData(data);
        } else {
          setData([]);
        }
        setIsVisibleLoading(false);
      });
    }
  }, [postFilter, ps, p, pageNumber]);

  function updatePageNumber(inc) {
    setPageNumber((currentVal) => currentVal + inc);
  }
  return (
    <div className="research">
      <div className="research-title py-3">
        <h1 className="text-danger text-center">Kết quả nghiên cứu</h1>
      </div>
      <PostFilter />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <>
          <div className="row">
            {getPost.length > 0 ? (
              getPost.map((item, index) => (
                <div className="col-6" key={index}>
                  <div className="card-content mt-3">
                    <Link className="text-decoration-none text-none textline" to={item.urlSlug}>
                      <h5>{item.title}</h5>
                    </Link>
                    <p className="card-shortdesc mt-3">{item.shortDescription}</p>
                    <div className="card-author">
                      <span className="card-author-title">Đăng bởi: </span>
                      <Link className="text-decoration-none" to={`/records/${item.user.urlSlug}`}>
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
          <Pager metadata={metadata} onPageChange={updatePageNumber} />
        </>
      )}
    </div>
  );
};
export default ResearchResult;

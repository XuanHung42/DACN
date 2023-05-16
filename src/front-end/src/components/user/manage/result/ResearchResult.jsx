import React, { useState } from "react";
import { useEffect } from "react";
import { getAllPost , getFilterPost} from "../../../../api/PostApi";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import PostFilter from "../../filter/PostFilterModel";
import { format } from 'date-fns'

const ResearchResult = () => {
  const [getPost, setGetPost] = useState([]);
  // const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true), 
  postFilter = useSelector((state) => state.postFilter);
  
  
  
    let { id } = useParams,
    p = 1,
    ps = 10;

  useEffect (() => {
    getFilterPost(postFilter.title,
      postFilter.shortDescription).then((data) => {
        if (data){
          setGetPost(data.items);
        }
        else{
          setGetPost([]);
        }
        setIsVisibleLoading(false);
      });
  }, [postFilter, ps, p]);

  return (
    <div className="research">
      <div className="research-title py-3">
        <h1 className="text-danger text-center">Kết quả nghiên cứu</h1>
      </div>
      <PostFilter />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <div className="row">
          {getPost.length > 0 ? (
            getPost.map((item, index) => (
              <div className="col-6" key={index}>
                <div className="card-content mt-1">
                  <Link className="text-decoration-none" to={item.urlSlug}>
                    <h3>{item.title}</h3>
                  </Link>
                  <p className="card-shortdesc">{item.shortDescription}</p>
                  <div className="card-author">
                    <span className="card-author-title">Đăng bởi: </span>
                    <Link className="text-decoration-none">
                      <span className="card-author-name">{item.user.name}</span>
                    </Link>
                    <span className="px-5">Đăng ngày: {format(new Date(item.created), 'dd/MM/yyyy hh:mm')}</span>
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
      )}
    </div>
  );
};
export default ResearchResult;

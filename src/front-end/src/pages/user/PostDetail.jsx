import React, { useEffect, useState } from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import { Link, useParams } from "react-router-dom";
import { getPostDetailBySlug } from "../../api/PostApi";
import { Table } from "react-bootstrap";
import "./styles/style.scss"
import { format } from 'date-fns'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faFileWord } from "@fortawesome/free-regular-svg-icons";


const PostDetail = () => {
  const params = useParams();
  const [postDetail, setPostDetail] = useState(null);

  const { slug } = params;

  useEffect(() => {
    getPostDetailBySlug(slug).then((data) => {
      if (data) {
        console.log("data check detail: ", data);
        setPostDetail(data);
      } else {
        setPostDetail({});
      }
    });
  }, [slug]);

  if (postDetail) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="department-title py-3">
            <h1 className="text-danger text-center">Chi tiết bài viết</h1>
          </div>
          <div className="post-detail">
            <Table bordered>
              <tbody>
                <tr>
                  <td className="post-lable w-25">Tiêu đề</td>
                  <td className="post-value">{postDetail.title}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Mô tả ngắn </td>
                  <td className="post-value">{postDetail.shortDescription}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Số lượt xem</td>
                  <td className="post-value">
                    <FontAwesomeIcon icon={faEye} className="text-danger px-1"/>
                    {postDetail.viewCount}
                  </td>
                </tr>
                <tr>
                  <td className="post-lable w-25">File dự án</td>
                  <td className="post-value">
                    {postDetail.file === null ? (
                      <div>Chưa có file đính kèm</div>
                    ) : (
                      <Link
                        to={`https://localhost:7284/${postDetail.file}`}
                        className="text-decoration-none text-danger"
                      >
                        Tải file xuống
                        <FontAwesomeIcon
                          icon={faFileWord}
                          fontSize={50}
                          className="text-danger px-2"
                        />
                      </Link>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Đăng ngày</td>
                  <td className="post-value">{format(new Date(postDetail.created), 'dd/MM/yyyy')}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Đăng bởi tác giả: </td>
                  <td className="post-value">
                    <p>
                      <Link to={`/records/${postDetail.user.urlSlug}`} className="text-decoration-none text-danger">
                        {postDetail.user.name}
                      </Link>
                    </p>
                    <p className="post-link">
                      <Link to={`mailto:${postDetail.user.email}`} >
                        <div>{postDetail.user.email}</div>
                      </Link>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Thuộc khoa</td>
                  <td className="post-value">
                    <Link to={`/department/${postDetail.department.urlSlug}`} className="text-decoration-none text-danger">
                      {postDetail.department.name}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Chủ đề</td>
                  <td className="post-value">
                    <Link to={`/topic/${postDetail.topic.urlSlug}`} className="text-decoration-none text-danger">
                      {postDetail.topic.name}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <Footer />
      </>
    );
  } else <></>;
};
export default PostDetail;
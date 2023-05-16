import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { getAllPost } from "../../../api/PostApi";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns'

const PostAdmin = () => {
  const [getPost, setGetPost] = useState([]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  useEffect(() => {
    getAllPost().then((data) => {
      if (data) {
        setGetPost(data);
      } else {
        setGetPost([]);
      }
      setIsVisibleLoading(false);
    });
  }, []);

  return (
    <>
      <div className="row">
        <Navbar />
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div className="title py-3 text-danger">
            <h3>Quản lý bài đăng</h3>
          </div>
          <div className="post-content">
            {isVisibleLoading ? (
              <Loading />
            ) : (
              <Table striped responsive bordered>
                <thead>
                  <tr>
                    <th>Tên post</th>
                    <th>Mô tả</th>
                    <th>Ngày đăng</th>
                    {/* <th>Trạng thái</th> */}
                    <th>Sửa</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {getPost.length > 0 ? (
                    getPost.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.shortDescription}</td>
                        <td>{format(new Date(item.created), 'dd/MM/yyyy')}</td>
                        {/* <td>{item.status}</td> */}
                        <td className="text-center">
                          <Link to={`/admin/post/edit/${item.id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                        </td>
                        <td className="text-center">
                          <div>
                            <FontAwesomeIcon icon={faTrash} color="red" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <h2 className="text-warning text-center py-3">
                        Không tìm thấy bài viết nào
                      </h2>
                    </>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default PostAdmin;

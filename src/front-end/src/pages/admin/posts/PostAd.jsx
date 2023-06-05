import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { getAllPost } from "../../../api/PostApi";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns'
import PostFilter from "../../../components/user/filter/PostFilterModel";
import { useSelector } from "react-redux";
import { getFilterPost } from "../../../api/PostApi";
// import { useSnackbar } from "notistack";



const PostAdmin = () => {
  const [getPost, setGetPost] = useState([]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true), postFilter = useSelector((state) => state.postFilter);
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let { id } = useParams,
  p = 1,
  ps = 10;

  useEffect(() => {
    getFilterPost(postFilter.title, postFilter.shortDescription).then(
      (data) => {
        if (data) {
          setGetPost(data.items);
        } else {
          setGetPost([]);
        }
        setIsVisibleLoading(false);
      }
    );
  }, [postFilter, ps, p]);

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
            <PostFilter/>
            <Link
              className="btn btn-success mb-2"
              to={`/admin/post/edit`}
            >
              Thêm mới <FontAwesomeIcon icon={faAdd} />
            </Link>
            {isVisibleLoading ? (
              <Loading />
            ) : (
              <Table striped responsive bordered>
                <thead>
                  <tr>
                    <th>Tên post</th>
                    <th>Mô tả</th>
                    <th>Ngày đăng</th>
                    <th>Đăng bởi</th>
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
                        <td>{item.user?.name}</td>
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
                    <tr>
                      <td colSpan={6}>
                        <h4 className="text-danger text-center">
                          Không tìm thấy bài viết nào
                        </h4>
                      </td>
                    </tr>
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

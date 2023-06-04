/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostById, updateAndAddPost } from "../../../api/PostApi";
import { getUserFilterDepartment } from "../../../api/UserApi";
import { useSnackbar } from "notistack";
import { Button, Form } from "react-bootstrap";

const PostAdminEdit = () => {
  const initialState = {
      id: 0,
      title: "",
      shortDescription: "",
      urlSlug: "",
      status: false,
      created: "",
      file: "",
      userId: 0,
      departmentId: 0,
    },
    [filterDepartment, setFilterDepartment] = useState({ departmentList: [] });

  const navigate = useNavigate();

  const [post, setPost] = useState(initialState);

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Thêm/ cập nhật bài đăng";
    getPostById(id).then((data) => {
      if (data) {
        setPost({
          ...data,
        });
      } else {
        setPost(initialState);
      }
    });

    getUserFilterDepartment().then((data) => {
      if (data) {
        setFilterDepartment({
          departmentList: data.departmentList,
        });
      } else {
        setFilterDepartment({ departmentList: [] });
      }
    });
  }, []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      setValidated(true);
    } else {
      let form = new FormData(e.target);

      updateAndAddPost(form).then((data) => {
        if (data) {
          enqueueSnackbar("Đã lưu thành công", {
            variant: "success",
          });
          navigate(`/admin/project`);
        } else
          enqueueSnackbar("Đã xảy ra lỗi", {
            variant: "error",
            closeSnackbar,
          });
      });
    }
  };

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
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Control type="hidden" name="id" value={post.id} />
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Tiêu đề
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="title"
                  title="Title"
                  required
                  value={post.title || ""}
                  onChange={(e) =>
                    setPost({ ...post, title: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>

            <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  UrlSlug
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="urlSlug"
                    title="Url Slug"
                    required
                    value={post.urlSlug || ""}
                    onChange={(e) =>
                      setPost({ ...post, urlSlug: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống.
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Tiêu đề ngắn
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="shortDescription"
                    title="Short Description"
                    required
                    value={post.shortDescription || ""}
                    onChange={(e) =>
                      setPost({ ...post, shortDescription: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống.
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Ngày đăng
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="created"
                    title="Created"
                    required
                    value={post.created || ""}
                    onChange={(e) =>
                      setPost({ ...post, created: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống.
                  </Form.Control.Feedback>
                </div>
              </div>



              <div className="text-center">
                <Button variant="success" type="submit">
                  Lưu các thay đổi
                </Button>
                <Link to="/admin/post" className="btn btn-danger ms-2">
                  Hủy và quay lại
                </Link>
              </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default PostAdminEdit;

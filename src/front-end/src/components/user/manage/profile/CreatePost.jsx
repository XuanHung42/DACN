import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostById, updateAndAddNewPost } from "../../../../api/PostApi";
import { getUserFilterDepartment } from "../../../../api/UserApi";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEmptyOrSpaces } from "../../../../utils/Utils";

import Layout from "../../common/Layout";
import { faFileWord } from "@fortawesome/free-regular-svg-icons";

const CreatePost = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const initialState = {
      id: 0,
      title: "",
      urlSlug: "",
      shortDescription: "",
      status: false,
      created: "",
      file: "",
      userId: 0,
      departmentId: 0,
    },
    [filterDepartment, setFilterDepartment] = useState({ departmentList: [] });
  const [post, setPost] = useState(initialState);
  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Nhà khoa học đăng bài";
    getPostById(id).then((data) => {
      if (data) {
        setPost({
          ...data,
        });
      } else {
        setPost(initialState);
      }
    });

    // filter department
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

  const [validated, setValidated] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      setValidated(true);
    } else {
      let form = new FormData(e.target);
      form.append('status', post.status);
      updateAndAddNewPost(form).then((data) => {
        if (data) {
          enqueueSnackbar("Chờ đợi quản trị phê duyệt", {
            variant: "success",
          });
          navigate(`/research`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi đăng bài", {
            variant: "error",
            closeSnackbar,
          });
        }
      });
    }
  };

  return (
    <>
      <div className="col-">
          <h3 className="text-success py-3">
            Đăng bài báo khoa học
          </h3>
          <div className="post-content">
            <Form
              method="post"
              encType=""
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
                    title="UrlSlug"
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
                  Mô tả ngắn
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
                    type="datetime-local"
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

              {!isEmptyOrSpaces(post.file) && (
                <div className="row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    File hiện tại
                  </Form.Label>
                  <div className="col-sm-10">
                    {post.file === null ? (
                      <div>Chưa có file đính kèm</div>
                    ) : (
                      <Link
                        to={`https://localhost:7284/${post.file}`}
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
                  </div>
                </div>
              )}

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Chọn file
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="file"
                    name="file"
                    accept="docx/*"
                    title="File"
                    onChange={(e) =>
                      setPost({
                        ...post,
                        file: e.target.files[0],
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống.
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Mã số ID của bạn
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="userId"
                    title="User Id"
                    required
                    value={post.userId || ""}
                    onChange={(e) =>
                      setPost({ ...post, userId: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống.
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Phòng khoa
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Select
                    name="departmentId"
                    title="department Id"
                    value={post.departmentId}
                    required
                    onChange={(e) =>
                      setPost({
                        ...post,
                        departmentId: e.target.value,
                      })
                    }
                  >
                    {filterDepartment.departmentList.length > 0 &&
                      filterDepartment.departmentList.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống.
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="text-center">
                <Button variant="success" type="submit">
                  Lưu các thay đổi
                </Button>
                <Link to="/research" className="btn btn-danger ms-2">
                  Hủy và quay lại
                </Link>
              </div>
            </Form>
          </div>
        </div>
    </>
  );
};

export default CreatePost;
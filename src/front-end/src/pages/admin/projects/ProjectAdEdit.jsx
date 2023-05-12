import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../../api/ProjectApi";
import { Button, Form } from "react-bootstrap";

const ProjectAdminEdit = () => {
  const [validated, setValidated] = useState(false);
  const initialState = {
      id: 0,
      name: "",
      urlSlug: "",
      description: "",
      shortDescription: "",
      costProject: "",
      userNumber: "",
    },
    [project, setProject] = useState(initialState);

  const navigate = useNavigate();
  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Thêm, cập nhật dự án";
    getProjectById(id).then((data) => {
      if (data) {
        setProject(data);
      } else {
        setProject(initialState);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);

      // upDate(id, data).then((data) => {
      //   if (data) {
      //     alert("Đã lưu thành công");
      //     navigate(`/admin/department`);
      //   } else {
      //     alert("Xảy ra lỗi khi lưu");
      //   }
      // });
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
        <h3 className="text-success py-3">Thêm/cập nhật dự án</h3>
          <Form
            method="post"
            encType=""
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
          <Form.Control type="hidden" name="id" value={project.id} />
              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Tên đề tài
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="name"
                    title="Name"
                    required
                    value={project.name || ""}
                    onChange={(e) =>
                      setProject({ ...project, name: e.target.value })
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
                    value={project.urlSlug || ""}
                    onChange={(e) =>
                      setProject({ ...project, urlSlug: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Mô tả
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="description"
                    title="Description"
                    required
                    value={project.description || ""}
                    onChange={(e) =>
                      setProject({ ...project, description: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
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
                    title="ShortDescription"
                    required
                    value={project.shortDescription || ""}
                    onChange={(e) =>
                      setProject({ ...project, shortDescription: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              
              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Chi phí dự án
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="costProject"
                    title="Cost Project"
                    required
                    value={project.costProject || ""}
                    onChange={(e) =>
                      setProject({ ...project, costProject: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Số người thực hiện
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="userNumber"
                    title="User Number"
                    required
                    value={project.userNumber || ""}
                    onChange={(e) =>
                      setProject({ ...project, userNumber: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="text-center">
                <Button variant="success" type="submit">
                  Lưu các thay đổi
                </Button>
                <Link to="/admin/project" className="btn btn-danger ms-2">
                  Hủy và quay lại
                </Link>
              </div>
              
          </Form>
        </div>
      </div>
    </>
  );
};
export default ProjectAdminEdit;

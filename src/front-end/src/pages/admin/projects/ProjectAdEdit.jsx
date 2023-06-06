import { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateAndAddProject } from "../../../api/ProjectApi";
import { Button, Form } from "react-bootstrap";
import { decode } from "../../../utils/Utils";
import { useSnackbar } from "notistack";

const ProjectAdminEdit = () => {
  const initialState = {
    id: 0,
    name: "",
    description: "",
    shortDescription: "",
    urlSlug: "",
    costProject: "",
    userNumber: 0,
    register: false,
    processId: 0,
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [project, setProject] = useState(initialState);
  let { id } = useParams();
  id = id ?? 0;
  useEffect(() => {
    document.title = "Thêm/ cập nhập dự án";
    getProjectById(id).then((data) => {
      if (data) {
        setProject({
          ...data,
        });
      } else {
        setProject(initialState);
      }
    });
  }, []);

  const [validated, setValidated] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      // e.StopPropagation();
      setValidated(true);
    } else {
      let formData = new FormData(e.target);
      console.log("dadasdsadsadsadsa: ",formData);
      updateAndAddProject(formData).then((data) => {
        console.log("Project", project);
        console.log("data", data);
        if (data)
        {
          enqueueSnackbar("Đã lưu thành công", {
            variant: "success",
          });
          navigate(`/admin/project`)
        }
        else
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
          <h3 className="text-success py-3">Thêm/cập nhật dự án</h3>
          <Form
            method="post"
            encType="multipart/form-data"
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
                  title="UrlSlug"
                  required
                  value={project.urlSlug || ""}
                  onChange={(e) =>
                    setProject({ ...project, urlSlug: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>

            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Mô tả</Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  as="textarea"
                  type="text"
                  name="description"
                  title="Description"
                  required
                  value={decode(project.description || "")}
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
                  as="textarea"
                  type="text"
                  name="shortDescription"
                  title="ShortDescription"
                  required
                  value={decode(project.shortDescription || "")}
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
                Kinh phí dự án
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

            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Tiến trình
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="processId"
                  title="Process Id"
                  required
                  value={project.processId || ""}
                  onChange={(e) =>
                    setProject({ ...project, processId: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-10 offset-sm-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="register"
                    checked={project.register}
                    title="register"
                    onChange={(e) =>
                      setProject({ ...project, register: e.target.checked })
                    }
                  />
                  <Form.Label className="form-check-label">
                    Đã đăng ký
                  </Form.Label>
                </div>
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

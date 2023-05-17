import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getUserResearchertById,
  updateUserResearcher,
} from "../../../api/UserApi";
import { Button, Form } from "react-bootstrap";
import { isEmptyOrSpaces } from "../../../utils/Utils";

const ResearchEditAdmin = () => {
  const [validated, setValidated] = useState(false);
  const initialState = {
      id: 0,
      name: "",
      // urlSlug: "",
      email: "",
      password: "",
      // imageUrl: "",
      birthDate: "",
      roleId: "",
      departmentId: "",
    },
    [researcher, setResearcher] = useState(initialState);

  const navigate = useNavigate();

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Thêm, cập nhật nhà khoa học";
    getUserResearchertById(id).then((data) => {
      if (data) {
        setResearcher(data);
      } else {
        setResearcher(initialState);
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

      updateUserResearcher(data).then((data) => {
        if (data) {
          alert("Đã lưu thành công");
          navigate(`/admin/department`);
        } else {
          alert("Xảy ra lỗi khi lưu");
        }
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
          <div className="researcher-wrapper">
            <h3 className="text-success py-3">Thêm/cập nhật nhà khoa học</h3>
            <Form
              method="post"
              encType=""
              onSubmit={handleSubmit}
              noValidate
              validated={validated}
            >
              <Form.Control type="hidden" name="id" value={researcher.id} />
              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Tên nhà khoa học
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="name"
                    title="Name"
                    required
                    value={researcher.name || ""}
                    onChange={(e) =>
                      setResearcher({ ...researcher, name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống.
                  </Form.Control.Feedback>
                </div>
              </div>

              {/* <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  UrlSlug
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="urlSlug"
                    title="Url Slug"
                    required
                    value={researcher.urlSlug || ""}
                    onChange={(e) =>
                      setResearcher({ ...researcher, urlSlug: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div> */}

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Email
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="email"
                    title="Email"
                    required
                    value={researcher.email || ""}
                    onChange={(e) =>
                      setResearcher({ ...researcher, email: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Mật khẩu
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="password"
                    title="Password"
                    required
                    value={researcher.password || ""}
                    onChange={(e) =>
                      setResearcher({ ...researcher, password: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Ngày sinh
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="birthDate"
                    title="BirthDate"
                    required
                    value={researcher.birthDate || ""}
                    onChange={(e) =>
                      setResearcher({
                        ...researcher,
                        birthDate: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Mã vai trò
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="roleId"
                    title="role Id"
                    required
                    value={researcher.roleId || ""}
                    onChange={(e) =>
                      setResearcher({
                        ...researcher,
                        roleId: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Phòng khoa
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="departmentId"
                    title="departmentId"
                    required
                    value={researcher.departmentId || ""}
                    onChange={(e) =>
                      setResearcher({
                        ...researcher,
                        departmentId: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống
                  </Form.Control.Feedback>
                </div>
              </div>

              {/* {!isEmptyOrSpaces(researcher.imageUrl) && (
                <div className="row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Hình hiện tại
                  </Form.Label>
                  <div className="col-sm-10">
                    <img src={researcher.imageUrl} alt={researcher.name} />
                  </div>
                </div>
              )}
              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Chọn hình ảnh
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    title="Image file"
                    onChange={(e) =>
                      setResearcher({
                        ...researcher,
                        imageFile: e.target.files[0],
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được bỏ trống.
                  </Form.Control.Feedback>
                </div>
              </div> */}

              <div className="text-center">
                <Button variant="success" type="submit">
                  Lưu các thay đổi
                </Button>
                <Link to="/admin/researcher" className="btn btn-danger ms-2">
                  Hủy và quay lại
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResearchEditAdmin;

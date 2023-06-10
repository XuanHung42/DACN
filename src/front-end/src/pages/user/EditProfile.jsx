import React, { useEffect, useState } from "react";
import Layout from "../../components/user/common/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getUserFilterDepartment,
  getUserFilterRole,
  getUserResearchertById,
  updateUserResearcher,
} from "../../api/UserApi";
import { Button, Form } from "react-bootstrap";
import "./styles/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { isEmptyOrSpaces } from "../../utils/Utils";
import { useSnackbar } from "notistack";

const EditProfile = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [validated, setValidated] = useState(false);

  const initialState = {
      id: 0,
      urlSlug: "",
      name: "",
      email: "",
      password: "",
      imageUrl: "",
      birthDate: "",
      roleId: 0,
      departmentId: 0,
    },
    [filterRole, setFilterRole] = useState({ roleList: [] }),
    [filterDepartment, setFilterDepartment] = useState({ departmentList: [] });

  const navigate = useNavigate();

  const [userResearcher, setUserResearcher] = useState(initialState);
  let { id } = useParams();
  id = id ?? 0;

  const getImage = (path) => {
    console.log(path);
    if (!path) {
      // set default image
      return `https://placehold.co/200x200?text=Image-not-found`;
    }

    return `https://localhost:7284/${path}`;
  };

  useEffect(() => {
    document.title = "Trang cá nhân";

    getUserResearchertById(id).then((data) => {
      if (data) {
        setUserResearcher({
          ...data,
        });
      } else {
        setUserResearcher(initialState);
      }
    });

    // get filter department
    getUserFilterDepartment().then((data) => {
      if (data) {
        setFilterDepartment({
          departmentList: data.departmentList,
        });
      } else {
        setFilterDepartment({ departmentList: [] });
      }
    });

    // get filter role
    getUserFilterRole().then((data) => {
      if (data) {
        setFilterRole({
          roleList: data.roleList,
        });
      } else {
        setFilterRole({ roleList: [] });
      }
    });

  }, []);

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let form = new FormData(e.target);
      console.log("form", form)

      updateUserResearcher(form).then((data) => {
        if (data) {
          console.log("data", data)
          enqueueSnackbar("Đã thêm thành công", {
            variant: "success",
          });
          navigate(`/profile/${userResearcher.id}`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi", {
            variant: "error",
          });
        }
      });
    }
  };


  return (
    <Layout>
      <div className="container">
        <h3 className="text-success py-3 text-center">
          Chỉnh sửa thông tin hồ sơ
        </h3>

        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          noValidate
          validated={validated}
        >
          {!isEmptyOrSpaces(userResearcher.imageUrl) && (
            <div className="row justify-content-center">
              <Form.Label className="col-sm-6 col-form-label">
                Hình hiện tại
              </Form.Label>
              <div className="text-center avata">
                <img
                  src={getImage(userResearcher.imageUrl)}
                  alt=""
                  className="rounded-circle"
                />
              </div>
            </div>
          )}

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Họ tên của bạn
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                title="Name"
                required
                value={userResearcher.name || ""}
                onChange={(e) =>
                  setUserResearcher({ ...userResearcher, name: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Không được bỏ trống.
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Mật khẩu
              </Form.Label>
              <Form.Control
                type="text"
                name="password"
                title="Password"
                required
                value={userResearcher.password || ""}
                onChange={(e) =>
                  setUserResearcher({
                    ...userResearcher,
                    password: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Không được bỏ trống.
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Email của bạn
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                title="Email"
                required
                value={userResearcher.email || ""}
                onChange={(e) =>
                  setUserResearcher({
                    ...userResearcher,
                    email: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Không được bỏ trống.
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Ngày sinh
              </Form.Label>
              <Form.Control
                type="datetime-local"
                name="birthDate"
                title="Birth Date"
                required
                value={userResearcher.birthDate || ""}
                onChange={(e) =>
                  setUserResearcher({
                    ...userResearcher,
                    birthDate: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Không được bỏ trống.
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Thuộc khoa
              </Form.Label>
              <Form.Select
                name="departmentId"
                title="department Id"
                value={userResearcher.departmentId}
                required
                onChange={(e) =>
                  setUserResearcher({
                    ...userResearcher,
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
              <Form.Control.Feedback type="invalid">
                Không được bỏ trống.
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Vai trò
              </Form.Label>
              <Form.Select
                    name="roleId"
                    title="role Id"
                    disabled
                    value={userResearcher.roleId}
                    required
                    onChange={(e) =>
                      setUserResearcher({
                        ...userResearcher,
                        roleId: e.target.value,
                      })
                    }
                  >
                    {filterRole.roleList.length > 0 &&
                      filterRole.roleList.map((item, index) => (
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


          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Chọn hình ảnh
              </Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                accept="image/*"
                title="Image file"
                onChange={(e) =>
                  setUserResearcher({
                    ...userResearcher,
                    imageFile: e.target.files[0],
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Không được bỏ trống.
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="text-center mt-5">
            <Button variant="success" type="submit">
              Lưu lại
              <FontAwesomeIcon icon={faSave} className="px-2" />
            </Button>
            <Link
              to={`/profile/${userResearcher.id}`}
              className="btn btn-danger ms-2"
            >
              Thoát
              <FontAwesomeIcon icon={faSignOut} className="px-2" />
            </Link>
          </div>
        </Form>
      </div>
    </Layout>
  );
};
export default EditProfile;

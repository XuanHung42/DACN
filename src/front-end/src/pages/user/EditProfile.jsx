import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getUserFilterDepartment,
  getUserFilterRole,
  getUserProfileById,
  updateProfileUser,
} from "../../api/UserApi";
import Layout from "../../components/user/common/Layout";
import { Button, Form } from "react-bootstrap";
import { isEmptyOrSpaces } from "../../utils/Utils";

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

  const [user, setUser] = useState(initialState);
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
    document.title = "Sửa hồ sơ";
    getUserProfileById(id).then((data) => {
      if (data)
        setUser({
          ...data,
        });
      else setUser(initialState);
    });

    getUserFilterRole().then((data) => {
      if (data) {
        setFilterRole({
          roleList: data.roleList,
        });
      } else {
        setFilterRole({ roleList: [] });
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

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let form = new FormData(e.target);
      console.log("form", form);

      updateProfileUser(form).then((data) => {
        if (data) {
          console.log("data", data);
          enqueueSnackbar("Đã sửa hồ sơ thành công", {
            variant: "success",
          });
          navigate(`/profile/${user.id}`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi sửa hồ sơ", {
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
          <Form.Control type="hidden" name="id" value={user.id} />

          <div className="text-center avata">
            <img
              src={getImage(user.imageUrl)}
              alt=""
              className="rounded-circle"
            />
            <p>Hình đại diện</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Tên nhà khoa học
              </Form.Label>
              <div className="col-sm-12">
                <Form.Control
                  type="text"
                  name="name"
                  title="Name"
                  required
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">Email</Form.Label>

              <div className="col-sm-12">
                <Form.Control
                  type="email"
                  name="email"
                  title="Email"
                  required
                  value={user.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Mật khẩu
              </Form.Label>

              <div className="col-sm-12">
                <Form.Control
                  type="text"
                  name="password"
                  title="Password"
                  required
                  value={user.password || ""}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              {/* <Form.Label className="col-sm-6 col-form-label">
                Vai trò
              </Form.Label> */}

              <div className="col-sm-12">
                <Form.Control
                  type="hidden"
                  name="roleId"
                  title="role Id"
                  value={user.roleId}
                  // required
                  // onChange={(e) =>
                  //   setUser({
                  //     ...user,
                  //     roleId: e.target.value,
                  //   })
                  // }
                >
                  {/* {filterRole.roleList.length > 0 &&
                    filterRole.roleList.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    ))} */}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Ngày sinh
              </Form.Label>

              <div className="col-sm-12">
                <Form.Control
                  type="datetime-local"
                  name="birthDate"
                  title="BirthDate"
                  required
                  value={user.birthDate || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      birthDate: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Phòng khoa
              </Form.Label>

              <div className="col-sm-12">
                <Form.Select
                  name="departmentId"
                  title="department Id"
                  value={user.departmentId}
                  required
                  onChange={(e) =>
                    setUser({
                      ...user,
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
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6">
              <Form.Label className="col-sm-6 col-form-label">
                Chọn hình ảnh
              </Form.Label>

              <div className="col-sm-12">
                <Form.Control
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  title="Image file"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      imageFile: e.target.files[0],
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>
          </div>

          {/* <div className="row justify-content-center">
            <div className="col-sm-6">
            {!isEmptyOrSpaces(user.imageUrl) && (
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Hình hiện tại
              </Form.Label>
              <div className="col-sm-12">
                <img
                  src={`https://localhost:7284/${user.imageUrl}`}
                  alt={user.name}
                />
              </div>
            </div>
          )}
            </div>
          </div> */}

          {/* <div className="row mb-3">
            <Form.Label className="col-sm-2 col-form-label">UrlSlug</Form.Label>
            <div className="col-sm-12">
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
                Không được bỏ trống.
              </Form.Control.Feedback>
            </div>
          </div> */}

          <div className="text-center mt-3">
            <Button variant="success" type="submit">
              Lưu các thay đổi
            </Button>
            <Link to={`/profile/${user.id}`} className="btn btn-danger ms-2">
              Hủy và quay lại
            </Link>
          </div>
        </Form>
      </div>
    </Layout>
  );
};
export default EditProfile;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDepartmentById,
  updateDepartment,
} from "../../../api/DepartmentApi";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";




const DepartmentEditAdmin = () => {
  const [validated, setValidated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const initialState = {
      id: 0,
      name: "",
    },
    [department, setDepartment] = useState(initialState);

  const navigate = useNavigate();

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Thêm, cập nhật phòng khoa";
    getDepartmentById(id).then((data) => {
      if (data) {
        setDepartment(data);
      } else {
        setDepartment(initialState);
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

      updateDepartment(id, data).then((data) => {
        if (data) {
          enqueueSnackbar("Đã lưu thành công", {
            variant: "success",
          }); 
          navigate(`/admin/department`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi khi lưu", {
            variant: "error",
          }); 
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
          <div className="department-wrapper">
            <h3 className="text-success py-3">Thêm/cập nhật phòng khoa</h3>
            <Form
              method="post"
              encType=""
              onSubmit={handleSubmit}
              noValidate
              validated={validated}
            >
              <Form.Control type="hidden" name="id" value={department.id} />
              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Tên phòng khoa
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="name"
                    title="Name"
                    required
                    value={department.name || ""}
                    onChange={(e) =>
                      setDepartment({ ...department, name: e.target.value })
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
                    value={department.urlSlug || ""}
                    onChange={(e) =>
                      setDepartment({ ...department, urlSlug: e.target.value })
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
                <Link to="/admin/department" className="btn btn-danger ms-2">
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
export default DepartmentEditAdmin;

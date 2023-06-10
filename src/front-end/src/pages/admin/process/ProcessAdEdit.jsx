import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/admin/layout/LayoutAd";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProcessById, newAndUpdateProcess } from "../../../api/Process";
import { Button, Form } from "react-bootstrap";

const ProcessEditAdmin = () => {
  const [validated, setValidated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const initialState = {
      id: 0,
      name: "",
      urlSlug: "",
    },
    [process, setProcess] = useState(initialState);

  const navigate = useNavigate();

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Thêm, cập nhật tiến trình";
    getProcessById(id).then((data) => {
      if (data) {
        setProcess(data);
      } else {
        setProcess(initialState);
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

      newAndUpdateProcess(id, data).then((data) => {
        if (data) {
          enqueueSnackbar("Đã lưu thành công", {
            variant: "success",
          });
          navigate(`/admin/process`);
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
      <LayoutAdmin>
        <h3 className="text-success py-3">Thêm/cập nhật tiến trình</h3>

        <Form
          method="post"
          encType=""
          onSubmit={handleSubmit}
          noValidate
          validated={validated}
        >
          <Form.Control type="hidden" name="id" value={process.id} />
          <div className="row mb-3">
            <Form.Label className="col-sm-2 col-form-label">
              Tên tiến trình
            </Form.Label>
            <div className="col-sm-10">
              <Form.Control
                type="text"
                name="name"
                title="Name"
                required
                value={process.name || ""}
                onChange={(e) =>
                  setProcess({ ...process, name: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Không được bỏ trống.
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="row mb-3">
            <Form.Label className="col-sm-2 col-form-label">UrlSlug</Form.Label>
            <div className="col-sm-10">
              <Form.Control
                type="text"
                name="urlSlug"
                title="Url Slug"
                required
                value={process.urlSlug || ""}
                onChange={(e) =>
                  setProcess({ ...process, urlSlug: e.target.value })
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
            <Link to="/admin/process" className="btn btn-danger ms-2">
              Hủy và quay lại
            </Link>
          </div>
        </Form>
      </LayoutAdmin>
    </>
  );
};
export default ProcessEditAdmin;

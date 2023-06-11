import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/admin/layout/LayoutAd";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CreateAndUpdateTopic, getTopicById } from "../../../api/Topic";
import { Button, Form } from "react-bootstrap";



const TopicAdminEdit = () => {
  const [validated, setValidated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const initialState = {
      id: 0,
      name: "",
      urlSlug: "",
    },
    [topic, setTopic] = useState(initialState);

  const navigate = useNavigate();

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Sửa/ thêm chủ đề";
    getTopicById(id).then((data) =>{
      if (data) {
        setTopic(data);
      } else {
        setTopic(initialState);
      }
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);

      CreateAndUpdateTopic(id, data).then((data) => {
        if (data) {
          enqueueSnackbar("Đã lưu thành công", {
            variant: "success",
          });
          navigate(`/admin/topic`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi khi lưu", {
            variant: "error",
          });
        }
      });
    }
  };


  return (
    <LayoutAdmin>
      <h3 className="text-success py-3">Thêm/cập nhật chủ đề dự án</h3>

      <Form
          method="post"
          encType=""
          onSubmit={handleSubmit}
          noValidate
          validated={validated}
        >
          <Form.Control type="hidden" name="id" value={topic.id} />
          <div className="row mb-3">
            <Form.Label className="col-sm-2 col-form-label">
              Tên chủ đề
            </Form.Label>
            <div className="col-sm-10">
              <Form.Control
                type="text"
                name="name"
                title="Name"
                required
                value={topic.name || ""}
                onChange={(e) =>
                  setTopic({ ...topic, name: e.target.value })
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
                value={topic.urlSlug || ""}
                onChange={(e) =>
                  setTopic({ ...topic, urlSlug: e.target.value })
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
            <Link to="/admin/topic" className="btn btn-danger ms-2">
              Hủy và quay lại
            </Link>
          </div>
        </Form>
    </LayoutAdmin>
  )
};
export default TopicAdminEdit;
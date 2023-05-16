import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  updateTitle,
  updateShortDescription,
} from "../../../redux/posts/Posts";
import { Form } from "react-bootstrap";

const PostFilter = () => {
  const postFilter = useSelector((state) => state.postFilter),
    dispatch = useDispatch();

  const handleReset = (e) => {
    dispatch(reset());
  };

  return (
    <>
      <Form
        method="get"
        onReset={handleReset}
        className="row gy-2 gx-3 align-items-center p-2 justify-content-end"
      >
        <Form.Group className="col-auto">
          <Form.Label className="visually-hidden">Tên</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            name="title"
            value={postFilter.title}
            onChange={(e) => dispatch(updateTitle(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="col-auto">
          <Form.Label className="visually-hidden">Mô tả ngắn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm mô tả"
            name="shortDescription"
            value={postFilter.shortDescription}
            onChange={(e) => dispatch(updateShortDescription(e.target.value))}
          />
        </Form.Group>
      </Form>
    </>
  );
};
export default PostFilter;

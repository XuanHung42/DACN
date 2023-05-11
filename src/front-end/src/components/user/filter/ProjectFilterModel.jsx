import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateName } from "../../../redux/projects/Project";
import { Form } from "react-bootstrap";

const ProjectFilter = () => {
  const projectFilter = useSelector((state) => state.projectFilter),
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
            name="name"
            value={projectFilter.name}
            onChange={(e) => dispatch(updateName(e.target.value))}
          />
        </Form.Group>
      </Form>
    </>
  );
};
export default ProjectFilter;

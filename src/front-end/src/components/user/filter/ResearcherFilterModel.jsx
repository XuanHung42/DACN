import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  updateEmail,
  updateName,
} from "../../../redux/researchers/Researcher";
import { Form } from "react-bootstrap";

const ResearchFilter = () => {
  const researcherFilter = useSelector((state) => state.researcherFilter),
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
            value={researcherFilter.name}
            onChange={(e) => dispatch(updateName(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="col-auto">
          <Form.Label className="visually-hidden">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo email"
            name="email"
            value={researcherFilter.email}
            onChange={(e) => dispatch(updateEmail(e.target.value))}
          />
        </Form.Group>
      </Form>
    </>
  );
};
export default ResearchFilter;

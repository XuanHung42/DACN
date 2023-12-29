import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  updateName,
  updateProcessId,
  updateMonth,
  updateYear,
} from "../../../redux/projects/Project";
import { Form } from "react-bootstrap";
import {
  getProcessListCombobox,
  getMonthListCombobox,
} from "../../../api/ProjectApi";

const ProjectFilterAdmin = () => {
  const projectFilter = useSelector((state) => state.projectFilter),
    dispatch = useDispatch(),
    [filter, setFilter] = useState({
      processList: [],
      monthList: [],
    });

  const handleReset = (e) => {
    dispatch(reset());
  };

  useEffect(() => {
    getProcessListCombobox().then((data) => {
      if (data) {
        setFilter({
          processList: data.processList,
        });
      } else {
        setFilter({
          processList: [],
        });
      }
    });

    getMonthListCombobox().then((data) => {
      if (data) {
        setFilter({
          monthList: data.monthList,
        });
      } else {
        setFilter({
          monthList: [],
        });
      }
    });
    
  }, []);

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

        <Form.Group className="col-auto">
          <Form.Label className="visually-hidden">Trạng thái</Form.Label>
          <Form.Select
            name="processId"
            value={projectFilter.processId}
            onChange={(e) => dispatch(updateProcessId(e.target.value))}
            title="Process Id"
          >
            <option value="">-- Lọc theo trạng thái --</option>
            {filter.processList.length > 0 &&
              filter.processList.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.text}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-auto">
          <Form.Label className="visually-hidden">Tháng</Form.Label>
          <Form.Select
            name="month"
            value={projectFilter.month}
            onChange={(e) => dispatch(updateMonth(e.target.value))}
            title="Update Month"
          >
            <option value="">-- Lọc theo tháng --</option>
            {filter.monthList.length > 0 &&
              filter.monthList.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.text}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-auto">
          <Form.Label className="visually-hidden">Năm </Form.Label>
          <Form.Control
            type="number"
            placeholder="Lọc theo năm đăng ký..."
            name="year"
            value={filter.year}
            max={filter.year}
            onChange={(e) => dispatch(updateYear(e.target.value))}
          />
        </Form.Group>
      </Form>
    </>
  );
};
export default ProjectFilterAdmin;

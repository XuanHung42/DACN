import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  deleteDepartment,
  getFilterDepartment,
} from "../../../api/DepartmentApi";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DepartmentFilter from "../../../components/user/filter/DepartmentFilterModel";
import { useSnackbar } from "notistack";
import LayoutAdmin from "../../../components/admin/layout/LayoutAd"; // layout admin

// import { current } from "@reduxjs/toolkit";
import Pager from "../../../components/pager/Pager";


const DepartmentAdmin = () => {
  const [getDepartment, setGetDepartment] = useState([]);
  const [reRender, setRender] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [metadata, setMetadata] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    departmentFilter = useSelector((state) => state.departmentFilter);

  let { id } = useParams,
    p = 1,
    ps = 5;
  function updatePageNumber(inc) {
    setPageNumber((currentVal) => currentVal + inc);
  }
  useEffect(() => {
    document.title = "Quản lý phòng khoa"

    loadDepartment();
    async function loadDepartment() {
      function setData(props) {
        setGetDepartment(props.items);
        setMetadata(props.metadata);
      }
      getFilterDepartment(departmentFilter.name, ps, pageNumber).then(
        (data) => {
          if (data) {
            setData(data);
          } else {
            setData([]);
          }
          setIsVisibleLoading(false);
        }
      );
    }
  }, [departmentFilter, ps, p, reRender, pageNumber]);

  const handleDeleteDepartment = (e, id) => {
    e.preventDefault();
    RemoveDepartment(id);
    async function RemoveDepartment(id) {
      if (window.confirm("Bạn có muốn xoá phòng khoa này")) {
        const response = await deleteDepartment(id);
        if (response) {
          enqueueSnackbar("Đã xoá thành công", {
            variant: "success",
          });
          setRender(true);
        } else {
          enqueueSnackbar("Đã xoá thành công", {
            variant: "error",
          });
        }
      }
    }
  };

  return (
    <>
      <LayoutAdmin>
        <div className="title py-3 text-danger">
          <h3>Quản lý phòng khoa</h3>
        </div>
        <div className="department-content">
          <DepartmentFilter />
          <Link className="btn btn-success mb-2" to={`/admin/department/edit`}>
            Thêm mới <FontAwesomeIcon icon={faAdd} />
          </Link>

          {isVisibleLoading ? (
            <Loading />
          ) : (
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Tên khoa</th>
                  <td>Số thành viên</td>
                  <th>Sửa</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody>
                {getDepartment.length > 0 ? (
                  getDepartment.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className="text-danger">
                        {item.countUser} Thành viên
                      </td>
                      <td className="text-center">
                        <Link to={`/admin/department/edit/${item.id}`} className="text-warning">
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </td>
                      <td className="text-center">
                        <div
                          onClick={(e) => handleDeleteDepartment(e, item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} color="red" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <h4 className="text-danger text-center">
                        Không tìm thấy phòng khoa nào
                      </h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
          <Pager metadata={metadata} onPageChange={updatePageNumber} />
        </div>
      </LayoutAdmin>
    </>
  );
};
export default DepartmentAdmin;

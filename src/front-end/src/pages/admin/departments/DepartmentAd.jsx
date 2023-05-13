import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteDepartment, getFilterDepartment } from "../../../api/DepartmentApi";
import Loading from "../../../components/user/Loading";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DepartmentFilter from "../../../components/user/filter/DepartmentFilterModel";

const DepartmentAdmin = () => {
  const [getDepartment, setGetDepartment] = useState([]);
  const [reRender, setRender] = useState(false);


  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    departmentFilter = useSelector((state) => state.departmentFilter);

  let { id } = useParams,
    p = 1,
    ps = 10;

  useEffect(() => {
    getFilterDepartment(departmentFilter.name).then((data) => {
      if (data) {
        setGetDepartment(data.items);
      } else {
        setGetDepartment([]);
      }
      setIsVisibleLoading(false);
    });
  }, [departmentFilter, ps, p, reRender]);

  const handleDeleteDepartment = (e, id ) => {
    e.preventDefault();
    RemoveDepartment(id);
    async function RemoveDepartment(id) {
      if (window.confirm("Bạn có muốn xoá phòng khoa này")) {
        const response = await deleteDepartment(id);
        if (response) {
          alert("Đã xoá phòng khoa này");
          
          setRender(true);
        } else alert("Đã xảy ra lỗi xoá");
      }
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
          <div className="title py-3 text-danger">
            <h3>Quản lý phòng khoa</h3>
          </div>
          <div className="department-content">
            <DepartmentFilter />
            <Link
              className="btn btn-success mb-2"
              to={`/admin/department/edit`}
            >
              Thêm mới <FontAwesomeIcon icon={faAdd} />
            </Link>

            {isVisibleLoading ? (
              <Loading />
            ) : (
              <Table striped responsive bordered>
                <thead>
                  <tr>
                    <th>Tên khoa</th>
                    <th>Sửa</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {getDepartment.length > 0 ? (
                    getDepartment.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td className="text-center">
                          <Link to={`/admin/department/edit/${item.id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                        </td>
                        <td className="text-center">
                          <div onClick={(e) => handleDeleteDepartment(e, item.id)}>
                            <FontAwesomeIcon icon={faTrash} color="red" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <h4 className="text-danger text-center">
                          Không tìm thấy phòng khoa nào
                        </h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default DepartmentAdmin;

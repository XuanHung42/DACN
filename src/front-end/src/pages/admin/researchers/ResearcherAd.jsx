import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getFilterResearch } from "../../../api/UserApi";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import ResearchFilter from "../../../components/user/filter/ResearcherFilterModel";

const ResearchAdmin = () => {
  const [getResearcher, setGetResearcher] = useState([]);

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    researcherFilter = useSelector((state) => state.researcherFilter);

  let { id } = useParams,
    p = 1,
    ps = 10;

  useEffect(() => {
    getFilterResearch(researcherFilter.name, researcherFilter.email).then(
      (data) => {
        if (data) {
          setGetResearcher(data.items);
        } else {
          setGetResearcher([]);
        }
        setIsVisibleLoading(false);
      }
    );
  }, [researcherFilter, ps, p]);

  return (
    <>
      <div className="row">
        <Navbar />
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div className="title py-3 text-danger">
            <h3>Quản lý nhà khoa học</h3>
          </div>
          <div className="department">
            <ResearchFilter />
            <Link
              className="btn btn-success mb-2"
              to={`/admin/researcher/edit`}
            >
              Thêm mới <FontAwesomeIcon icon={faAdd} />
            </Link>

            {isVisibleLoading ? (
              <Loading />
            ) : (
              <Table striped responsive bordered>
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Ngày sinh</th>
                    <th>Thuộc khoa</th>
                    <th>Sửa</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {getResearcher.length > 0 ? (
                    getResearcher.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          {format(new Date(item.birthDate), "dd/MM/yyyy")}
                        </td>
                        <td>{item.departmentId}</td>

                        <td className="text-center">
                          <Link to={`/admin/researcher/edit/${item.id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                        </td>
                        <td className="text-center">
                          <div>
                            <FontAwesomeIcon icon={faTrash} color="red" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <h4 className="text-danger text-center">
                          Không tìm thấy nhà khoa học
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
export default ResearchAdmin;

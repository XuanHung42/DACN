import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteProject, getFilterProject } from "../../../api/ProjectApi";
import ProjectFilter from "../../../components/user/filter/ProjectFilterModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { useSnackbar } from "notistack";


const ProjectAdmin = () => {
  const [getProject, setGetProject] = useState([]);
  const [reRender, setRender] = useState(false);

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    projectFilter = useSelector((state) => state.projectFilter);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let { id } = useParams,
    p = 1,
    ps = 10;

  useEffect(() => {
    getFilterProject(projectFilter.name).then((data) => {
      if (data) {
        setGetProject(data.items);
      } else {
        setGetProject([]);
      }
      setIsVisibleLoading(false);
    });
  }, [projectFilter, ps, p, reRender]);

  // delete project
  const handleDeleteProject = (e, id ) => {
    e.preventDefault();
    DeleteProject(id);
    async function DeleteProject(id) {
      if (window.confirm("Bạn có muốn xoá dự án này")) {
        const response = await deleteProject(id);
        if (response) {
          setRender(true);
          enqueueSnackbar("Xoá dự án thành công", {
            variant: "success",
          }); 
        } else {
          enqueueSnackbar("Đã xảy ra lỗi dự án", {
            variant: "success",
          }); 
        }
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
            <h3>Quản lý dự án</h3>
          </div>
          <div className="project-content">
            <ProjectFilter />
            <Link
              className="btn btn-success mb-2"
              to={`/admin/project/edit`}
            >
              Thêm mới <FontAwesomeIcon icon={faAdd} />
            </Link>

            {isVisibleLoading ? (
              <Loading />
            ) : (
              <Table striped responsive bordered>
                <thead>
                  <tr>
                    <th>Tên dự án</th>
                    <th>Mô tả ngắn</th>
                    <th>Chi phí</th>
                    <th>Số người</th>
                    {/* <th>Đăng ký</th> */}
                    <th>Sửa</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {getProject.length > 0 ? (
                    getProject.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.shortDescription}</td>
                        <td>{item.costProject} VNĐ</td>
                        <td>{item.userNumber}</td>
                        {/* <td>{item.register}</td> */}
                        <td className="text-center">
                          <Link to={`/admin/project/edit/${item.id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                        </td>
                        <td className="text-center">
                          <div onClick={(e) => handleDeleteProject(e, item.id)}>
                            <FontAwesomeIcon icon={faTrash} color="red" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>
                        <h4 className="text-danger text-center">
                          Không tìm thấy dự án nào
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
export default ProjectAdmin;

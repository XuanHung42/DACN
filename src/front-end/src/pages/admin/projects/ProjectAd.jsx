/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteProject, getFilterProject } from "../../../api/ProjectApi";
import ProjectFilter from "../../../components/user/filter/ProjectFilterModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { useSnackbar } from "notistack";
import Pager from "../../../components/pager/Pager";
import { format } from "date-fns";
import { getAllDashboard } from "../../../api/DashboardApi";
import LayoutAdmin from "../../../components/admin/layout/LayoutAd";
import ProjectFilterAdmin from "../../../components/user/filter/ProjectFilterAdmin";

const ProjectAdmin = () => {
  const { querySearch, params } = "";
  const [getProject, setGetProject] = useState([]);
  const [reRender, setRender] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [metadata, setMetadata] = useState({});

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    projectFilter = useSelector((state) => state.projectFilter);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let { id } = useParams,
    p = 1,
    ps = 5;

  useEffect(() => {
    loadProject();
    async function loadProject() {
      const parameters = new URLSearchParams({
        pageNumber:
          Object.fromEntries(querySearch || "").length > 0
            ? 1
            : pageNumber || 1,

        pageSize: 2,
        ...Object.fromEntries(querySearch || ""),
        ...params,
      });
      function setData(props) {
        setGetProject(props.items);
        setMetadata(props.metadata);
      }

      getFilterProject(
        projectFilter.name,
        // projectFilter.processId,
        // projectFilter.monthList,
        // projectFilter.yearList,
        parameters.pageSize,
        pageNumber
      ).then((data) => {
        if (data) {
          setData(data);
        } else {
          setData([]);
        }
        setIsVisibleLoading(false);
      });
    }
  }, [projectFilter, ps, p, reRender, pageNumber]);

  // delete project
  const handleDeleteProject = (e, id) => {
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

  function updatePageNumber(inc) {
    setPageNumber((currentVal) => currentVal + inc);
  }

  const [dashboardItem, setDashboardItem] = useState({});

  useEffect(() => {
    getDashboard();
    async function getDashboard() {
      const response = await getAllDashboard();
      if (response) {
        console.log("response check: ", response);
        setDashboardItem(response);
      } else {
        setDashboardItem({});
      }
    }
  }, []);
  return (
    <>
      <LayoutAdmin>
        <div className="title py-3 text-danger">
          <h3>Quản lý dự án</h3>
        </div>
        <div className="project-content">
          {/* <ProjectFilterAdmin/> */}
          <ProjectFilter/>
          <div className="d-flex align-items-center justify-content-between">
            <Link className="btn btn-success mb-2" to={`/admin/project/edit`}>
              Thêm mới <FontAwesomeIcon icon={faAdd} />
            </Link>
            <div className="">
              <div className="px-2 text-danger">
                Dự án chưa đăng ký:
                <span className="px-1">
                  {dashboardItem.countProjectNotRegister}
                </span>
                dự án
              </div>
              <div className="px-2 text-success">
                Dự án đã đăng ký:
                <span className="px-1">
                  {dashboardItem.countProjectRegister}
                </span>
                dự án
              </div>
            </div>
          </div>
          {isVisibleLoading ? (
            <Loading />
          ) : (
            <>
              <Table  responsive bordered>
                <thead>
                  <tr>
                    <th className="w-25">Tên dự án</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Người thực hiện</th>
                    <th>Trạng thái</th>
                    <th>Tiến trình</th>
                    <th>Sửa</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {getProject.length > 0 ? (
                    getProject.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                          {format(new Date(item.startDate), "dd/MM/yyyy")}
                        </td>
                        <td>{format(new Date(item.endDate), "dd/MM/yyyy")}</td>
                        <td>
                          {item.users.map((item, index) => (
                            <div className="text-primary" key={index}>
                              {item.name}
                            </div>
                          ))}
                        </td>
                        <td>{item.register ? (
                          <span className="text-success">Đã phê duyệt</span>
                        ): (
                          <span className="text-danger">Chưa phê duyệt</span>
                        )}</td>
                        <td className="text-primary">
                          {item.process.name}
                        </td>
                        <td className="text-center">
                          <Link to={`/admin/project/edit/${item.id}`} className="text-warning">
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
            </>
          )}
          <Pager metadata={metadata} onPageChange={updatePageNumber} />
        </div>
      </LayoutAdmin>
    </>
  );
};
export default ProjectAdmin;

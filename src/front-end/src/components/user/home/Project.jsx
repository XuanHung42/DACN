import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Loading from "../Loading";
import { getFilterProject } from "../../../api/ProjectApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProjectFilter from "../filter/ProjectFilterModel";

const Project = () => {
  const [getProject, setGetProject] = useState([]);

  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    projectFilter = useSelector((state) => state.projectFilter);

  let { id } = useParams,
    p = 1,
    ps = 10;

  useEffect(() => {
    getFilterProject(projectFilter.name).then((data) => {
      if (data) {
        console.log("data check abc: ", data);
        setGetProject(data.items);
      } else {
        setGetProject([]);
      }
      setIsVisibleLoading(false);
    });
  }, [projectFilter, ps, p]);

  return (
    <div>
      <ProjectFilter />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <>
          <Table striped responsive bordered>
            <thead>
              <tr>
                <th>Tên đề tài</th>
                <th>Mô tả ngắn</th>
                <th>Kinh phí thực hiện</th>
                <th>Số thành viên</th>
                <th>Trạng thái</th>
                <th>Đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {getProject.length > 0 ? (
                getProject.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.shortDescription}</td>
                    <td>{item.costProject}</td>
                    <td>{item.userNumber}</td>
                    <td className="text-danger">{item.process?.name}</td>
                    <td className="text-center">
                      <Button className="btn-success" onClick={(e) => alert("Chức năng này đang được phát triển")}>Đăng ký</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
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
    </div>
  );
};
export default Project;

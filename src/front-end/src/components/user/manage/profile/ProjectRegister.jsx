import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectByResearchId } from "../../../../api/ProjectApi";
import { format } from "date-fns";
import { Table } from "react-bootstrap";

const ProjectRegister = () => {
  const [project, setProject] = useState([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    getProjectByResearchId(id).then((data) => {
      if (data) {
        setProject(data.items);
      } else {
        setProject({});
      }
    });
  }, [id]);

  return (
    <>
      <div className="department-title py-3">
        <h2 className="text-danger text-center">Dự án của bạn đã đăng ký</h2>
      </div>
      <Table striped responsive bordered>
        <thead>
          <tr>
            <th className="w-25">Tên dự án</th>
            <th className="w-15">Mô tả ngắn</th>
            <th>Kinh phí thực hiện</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Người thực hiện</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {project.length > 0 ? (
            project.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/project/${item.urlSlug}`}
                    className="text-decoration-none text-danger"
                  >
                    {item.name}
                  </Link>
                </td>
                <td>{item.shortDescription}</td>
                <td>{item.costProject} VNĐ</td>
                <td>{format(new Date(item.startDate), "dd/MM/yyyy")}</td>
                <td>{format(new Date(item.endDate), "dd/MM/yyyy")}</td>
                <td>
                  {item.users.map((item, index) => (
                    <div className="text-danger" key={index}>
                      {item.name}
                    </div>
                  ))}
                </td>
                <td className="text-success">
                  {item.process.name}
                  {/* {item.register ? (
                    <div className="text-success">Đã đăng ký</div>
                  ) : (
                    <div className="text-danger">Chưa đăng ký</div>
                  )} */}
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
  );
};
export default ProjectRegister;

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Loading from "../Loading";
import { getFilterProject } from "../../../api/ProjectApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProjectFilter from "../filter/ProjectFilterModel";
import { addProjectsToUser } from "../../../api/UserApi";
import { useSnackbar } from "notistack";

const Project = () => {
  const [getProject, setGetProject] = useState([]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const projectFilter = useSelector((state) => state.projectFilter);
  const user = useSelector((state) => state.auth.login.currentUser);

  const { enqueueSnackbar } = useSnackbar();
  const [isRegistered, setIsRegistered] = useState([]);
  let { id } = useParams();
  let p = 1;
  let ps = 10;

  const handleRegister = (projectId, index) => {
    if (user != null && user.result != null) {
      const hasUserRegistered = getProject[index].users.some(
        (userThis) => userThis.id === user.result.id
      );
      if (hasUserRegistered) {
        setIsRegistered((prevState) => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
        enqueueSnackbar("Bạn đã đăng ký dự án này rồi", { variant: "warning" });
      } else {
        addProjectsToUser(user.result.id, [projectId]).then(() => {
          // Cập nhật lại danh sách các dự án trong getProject sau khi đăng ký thành công
          getFilterProject(projectFilter.name).then((data) => {
            if (data) {
              setGetProject(data.items);
              setIsRegistered((prevState) => {
                const newState = [...prevState];
                newState[index] = true;
                return newState;
              });
              localStorage.setItem(`isRegistered_${projectId}`, true);
              enqueueSnackbar("Đăng ký thành công", { variant: "success" });
            } else {
              setGetProject([]);
            }
          });
        });
      }
    } else {
      enqueueSnackbar("Bạn cần đăng nhập để đăng ký dự án", { variant: "error" });
    }
  };

  useEffect(() => {
    getFilterProject(projectFilter.name).then((data) => {
      if (data) {
        setGetProject(data.items);
        setIsRegistered(data.items.map((project) => {
          const key = `isRegistered_${project.id}`;
          return localStorage.getItem(key) === "true";
        }));
        const hasUserRegistered = data.items.some(
          (project) =>
            project.id === id &&
            user &&
            user.result &&
            project.users.some((userThis) => userThis.id === user.result.id)
        );
        if (hasUserRegistered) {
          setIsRegistered((prevState) => {
            const newState = [...prevState];
            const index = data.items.findIndex((project) => project.id === id);
            newState[index] = true;
            return newState;
          });
          
        }
      } else {
        setGetProject([]);
        setIsRegistered([]);
      }
      setIsVisibleLoading(false);
    });
  }, [projectFilter, ps, p, id, user]);

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
                      <Button
                        className="btn-success"
                        onClick={() => handleRegister(item.id, index)}
                        disabled={isRegistered[index]}
                      >
                        {isRegistered[index] ? "Đã đăng ký" : "Đăng ký"}
                      </Button>
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
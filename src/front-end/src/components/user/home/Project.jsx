import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Loading from "../Loading";
import { getFilterProject } from "../../../api/ProjectApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProjectFilter from "../filter/ProjectFilterModel";
import {
  addProjectsToUser,
  getUserResearchertById,
} from "../../../api/UserApi";
import { useSnackbar } from "notistack";
import { loginSuccess } from "../../../redux/account/Account";
import { format } from "date-fns";
import Pager from "../../pager/Pager";

const Project = () => {
  const [getProject, setGetProject] = useState([]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const projectFilter = useSelector((state) => state.projectFilter);
  const user = useSelector((state) => state.auth.login.currentUser);
  const { enqueueSnackbar } = useSnackbar();
  const [isRegistered, setIsRegistered] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [metadata, setMetadata] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  let p = 1;
  let ps = 3;

  
  const handleRegister = (projectId, index) => {
    console.log("user:", user);
    console.log("projectId:", projectId);
    console.log("index:", index);
    if (user && user.result) {
      getUserResearchertById(user.result.id).then((data) => {
        if (data && data.projects) {
          console.log(data);
          const hasUserRegistered = data.projects.some(
            (project) => project.id === projectId
          );
          console.log("hasUserRegister", hasUserRegistered);
          if (hasUserRegistered) {
            setIsRegistered((prevState) => {
              const newState = [...prevState];
              newState[index] = true;
              return newState;
            });
            enqueueSnackbar("Bạn đã đăng ký dự án này rồi", {
              variant: "warning",
            });
          } else {
            addProjectsToUser(user.result.id, [projectId]).then(() => {
              setIsRegistered((prevState) => {
                const newState = [...prevState];
                newState[index] = true;
                return newState;
              });
              localStorage.setItem(`isRegistered_${projectId}`, true);
              enqueueSnackbar("Đăng ký thành công", { variant: "success" });
            });
          }
        }
      });
    } else {
      enqueueSnackbar("Bạn cần đăng nhập để đăng ký dự án", {
        variant: "error",
      });
    }
  };

  useEffect(() => {

    getFilterProject(projectFilter.name, ps, pageNumber).then((data) => {
      if (data) {
        setGetProject(data.items);
        setIsRegistered(
          data.items.map((project) => {
            const key = `isRegistered_${project.id}`;
            return localStorage.getItem(key) === "true";
          })
        );

        if (user && user.result) {
          getUserResearchertById(user.result.id).then((userData) => {
            if (userData && userData.projects) {
              const registeredProjects = userData.projects.map(
                (project) => project.id
              );
              setIsRegistered((prevState) => {
                const newState = [...prevState];
                data.items.forEach((project, index) => {
                  if (registeredProjects.includes(project.id)) {
                    newState[index] = true;
                  }
                });
                return newState;
              });
            }
          });
        }
      }
      setIsVisibleLoading(false);
    });
  }, [projectFilter, ps, p, user, pageNumber]);

  
  function updatePageNumber(inc) {
    setPageNumber((currentVal) => currentVal + inc);
  }
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
                <th>Kinh phí dự án</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Chủ đề</th>
                <th>Số thành viên</th>
                <th>Đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {getProject.length > 0 ? (
                getProject.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.shortDescription}</td>
                    <td>{item.costProject} VNĐ</td>
                    <td>{format(new Date(item.startDate), "dd/MM/yyyy")}</td>
                    <td>{format(new Date(item.endDate), "dd/MM/yyyy")}</td>
                    <td>{item.topic.name}</td>
                    <td>{item.userNumber}</td>
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
                  <td colSpan={8}>
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
  );
};

export default Project;

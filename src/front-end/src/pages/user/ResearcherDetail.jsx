import React, { useEffect, useState } from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import { Link, useParams } from "react-router-dom";
import { getUserDetailBySlug } from "../../api/UserApi";
import { Tab, Table, Tabs } from "react-bootstrap";
import { format } from "date-fns";
import Layout from "../../components/user/common/Layout";
import ProjectResearch from "../../components/user/manage/projects/ProjectResearch";
const ResearcherDetail = () => {
  const params = useParams();
  const [reseacherDetail, setResearchDetail] = useState(null);

  const { slug } = params;

  useEffect(() => {
    getUserDetailBySlug(slug).then((data) => {
      if (data) {
        setResearchDetail(data);
      } else {
        setResearchDetail({});
      }
    });
  }, [slug]);

  const getImage = (path) => {
    console.log(path);
    if (!path) {
      // set default image
      return `https://placehold.co/200x200?text=Image-not-found`;
    }

    return `https://localhost:7284/${path}`;
  };

  if (reseacherDetail) {
    return (
      <>
        <Layout>
          <Tabs className="mb-3 mt-5">
            <Tab eventKey="users" title="Thông tin nhà khoa học">
              <div className="department-title py-3">
                <h2 className="text-danger text-center">
                  Thông tin nhà khoa học
                </h2>
              </div>
              <Table bordered>
                <tbody>
                  <tr>
                    <td className="post-lable w-25">Họ tên</td>
                    <td className="post-value">{reseacherDetail.name}</td>
                  </tr>
                  <tr>
                    <td className="post-lable w-25">Email</td>
                    <td className="post-value">
                      <div className="post-link">
                        {reseacherDetail.email === null ? (
                          <span className="text-danger">
                            Email: Tác giả chưa cập nhật email
                          </span>
                        ) : (
                          <Link
                            className="text-danger text-decoration-none"
                            to={`mailto:${reseacherDetail.email}`}
                          >
                            Email: {reseacherDetail.email}
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="post-lable w-25">Hình ảnh</td>
                    <td className="post-value">
                      <img
                        src={getImage(reseacherDetail.imageUrl)}
                        alt=""
                        height={100}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="post-lable w-25">Ngày sinh</td>
                    <td className="post-value">
                      {" "}
                      {format(
                        new Date(reseacherDetail.birthDate),
                        "dd/MM/yyyy hh:mm"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="post-lable w-25">Giảng viên khoa</td>
                    <td className="post-value">
                      {reseacherDetail.departmentName}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="result" title="Dự án tham gia">
              <ProjectResearch/>
            </Tab>
            {/* <Tab eventKey="post" title="Bài báo khoa học">
              
            </Tab> */}
          </Tabs>
        </Layout>
      </>
    );
  } else <></>;
};
export default ResearcherDetail;

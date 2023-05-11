import React, { useEffect, useState } from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import { Link, useParams } from "react-router-dom";
import { getUserDetailBySlug } from "../../api/UserApi";
import { Table } from "react-bootstrap";

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

  if (reseacherDetail) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="department-title py-3">
            <h1 className="text-danger text-center">Thông tin nhà khoa học</h1>
          </div>
          <div className="researcher-detail">
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
                      <Link to={`mailto:${reseacherDetail.email}`}>
                        <div>{reseacherDetail.email}</div>
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Hình ảnh</td>
                  <td className="post-value">
                  <img src={`https://localhost:7284/${reseacherDetail.imageUrl}`} alt="" />
                  </td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Ngày sinh</td>
                  <td className="post-value">{reseacherDetail.birthDate}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Thuộc khoa</td>
                  <td className="post-value">{reseacherDetail.departmentId}</td>
                </tr>

              </tbody>
            </Table>
          </div>
        </div>
        <Footer />
      </>
    );
  } else <></>;
};
export default ResearcherDetail;

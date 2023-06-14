import React, { useEffect, useState } from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import { Link, useParams } from "react-router-dom";
import { getUserDetailBySlug } from "../../api/UserApi";
import { Table } from "react-bootstrap";
import { format } from "date-fns";

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
                    <img src={getImage(reseacherDetail.imageUrl)} alt="" height={100}/>
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
                  {/* <td className="post-lable w-25">Thuộc khoa</td>
                  <td className="post-value">{reseacherDetail.departmentName}</td> */}
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

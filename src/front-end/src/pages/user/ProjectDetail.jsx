import React, { useEffect, useState } from "react";
import Layout from "../../components/user/common/Layout";
import { Link, useParams } from "react-router-dom";
import { getProjectDetailBySlug } from "../../api/ProjectApi";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from 'date-fns'

const ProjectDetail = () => {
  const params = useParams();
  const [projectDetail, setProjectDetail] = useState(null);

  const { slug } = params;

  useEffect(() => {
    getProjectDetailBySlug(slug).then((data) => {
      if (data) {
        setProjectDetail(data);
      } else {
        setProjectDetail({});
      }
    });
  }, [slug]);

  if (projectDetail) {
    return (
      <Layout>
        <div className="department-title py-3">
          <h1 className="text-danger text-center">Chi tiết dự án</h1>

        </div>

        <div className="project-detail">
            <Table bordered>
              <tbody>
                <tr className="text-danger">
                  <td className="post-lable w-25">Tiêu đề</td>
                  <td className="post-value">{projectDetail.name}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Mô tả ngắn </td>
                  <td className="post-value">{projectDetail.shortDescription}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Mô tả</td>
                  <td className="post-value">{projectDetail.description}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Lưu ý</td>
                  <td className="post-value">
                  {projectDetail.note === "" ? (
                    <>
                      <span className="text-primary">Không có ghi chú</span>
                    </>
                  ): (
                    <span className="text-danger">
                      {projectDetail.note}
                    </span>
                  )}
                  </td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Ngày bắt đầu</td>
                  <td className="post-value">{format(new Date(projectDetail.startDate), 'dd/MM/yyyy')}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Ngày kết thúc</td>
                  <td className="post-value">{format(new Date(projectDetail.endDate), 'dd/MM/yyyy')}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Kinh phí thực hiện</td>
                  <td className="post-value">{projectDetail.costProject} VNĐ</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Số thành viên</td>
                  <td className="post-value">{projectDetail.userNumber} thành viên</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Chủ đề</td>
                  <td className="post-value">{projectDetail.topic.name}</td>
                </tr>
                <tr>
                  <td className="post-lable w-25">Trạng thái tiến độ</td>
                  <td className="post-value">{projectDetail.process.name}</td>
                </tr>
                
              </tbody>
            </Table>
          </div>


      </Layout>
    );
  } else <></>;
};
export default ProjectDetail;

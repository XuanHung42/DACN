import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/admin/layout/LayoutAd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteTopic, getAllTopic} from "../../../api/Topic";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { useSnackbar } from "notistack";


const TopicAdmin = () => {
  const [getTopic, setGetTopic] = useState([]);
  const [reRender, setRender] = useState(false);
   const [isVisibleLoading, setIsVisibleLoading] = useState(true);
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

   useEffect(() => {
      document.title = "Quản lý lĩnh vực"
      getAllTopic().then((data) => {
        if (data) {
          setGetTopic(data);
        }else{
          setGetTopic([]);
        }
        setIsVisibleLoading(false);
      });
   }, [reRender]);


   // handle delete process
  const handleDeleteTopic = (e, id) => {
    e.preventDefault();
    RemoveTopic(id);
    async function RemoveTopic(id) {
      if (window.confirm("Bạn có muốn xoá tiến độ này")) {
        const response = await deleteTopic(id);
        if (response) {
          enqueueSnackbar("Đã xoá thành công", {
            variant: "success",
          });
          setRender(true);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi xoá", {
            variant: "error",
          });
        }
      }
    }
  }


  return (
    <LayoutAdmin>
      <div className="title py-3 text-danger">
        <h3>Quản lý lĩnh vực đề tài dự án</h3>
      </div>
      <Link className="btn btn-success mb-2" to={`/admin/topic/edit`}>
        Thêm mới <FontAwesomeIcon icon={faAdd} />
      </Link>

      {isVisibleLoading ? (
          <Loading/>
        ) : (
          <Table  responsive bordered>
            <thead>
              <tr>
                <th>Tên chủ đề</th>
                <th>Sửa</th>
                <th>Xoá</th>
              </tr>
            </thead>
            <tbody>
              {getTopic.length > 0 ? (
                getTopic.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-center">
                      <Link to={`/admin/topic/edit/${item.id}`} className="text-warning">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </td>
                    <td className="text-center">
                      <div onClick={(e) => handleDeleteTopic(e, item.id)}>
                        <FontAwesomeIcon icon={faTrash} color="red" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <h4 className="text-danger text-center">
                      Không tìm thấy chủ đề nào
                    </h4>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}



    </LayoutAdmin>
  );
};
export default TopicAdmin;

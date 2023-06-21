import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/admin/layout/LayoutAd";
import { Link, useParams } from "react-router-dom";
import { deleteProcess, getAllProcess } from "../../../api/Process";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { useSnackbar } from "notistack";

const ProcessAdmin = () => {
  const [getProcess, setGetProcess] = useState([]);
  const [reRender, setRender] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  useEffect(() => {
    getAllProcess().then((data) => {
      if (data) {
        setGetProcess(data);
      } else {
        setGetProcess([]);
      }
      setIsVisibleLoading(false);
    });
  }, [reRender]);


  // handle delete process
  const handleDeleteProcess = (e, id) => {
    e.preventDefault();
    RemoveProcess(id);
    async function RemoveProcess(id) {
      if (window.confirm("Bạn có muốn xoá tiến độ này")) {
        const response = await deleteProcess(id);
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
    <>
      <LayoutAdmin>
        <div className="title py-3 text-danger">
          <h3>Quản lý trạng thái tiến độ thực hiện dự án</h3>
        </div>
        <Link className="btn btn-success mb-2" to={`/admin/process/edit`}>
          Thêm mới <FontAwesomeIcon icon={faAdd} />
        </Link>

        {isVisibleLoading ? (
          <Loading/>
        ) : (
          <Table  responsive bordered>
            <thead>
              <tr>
                <th>Tên tiến độ</th>
                <th>Số dự án</th>
                <th>Sửa</th>
                <th>Xoá</th>
              </tr>
            </thead>
            <tbody>
              {getProcess.length > 0 ? (
                getProcess.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.countProject} {item.name}</td>
                    <td className="text-center">
                      <Link to={`/admin/process/edit/${item.id}`} className="text-warning">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </td>
                    <td className="text-center">
                      <div onClick={(e) => handleDeleteProcess(e, item.id)}>
                        <FontAwesomeIcon icon={faTrash} color="red" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <h4 className="text-danger text-center">
                      Không tìm thấy phòng khoa nào
                    </h4>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </LayoutAdmin>
    </>
  );
};
export default ProcessAdmin;

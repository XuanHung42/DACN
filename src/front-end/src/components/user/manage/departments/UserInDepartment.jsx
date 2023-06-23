import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserByDepartmentSlug } from "../../../../api/DepartmentApi";
import Loading from "../../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserInDepartment = () => {
  const [useDepartment, setUserDepartment] = useState([]);
  const params = useParams();
  const { slug } = params;

  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  
  useEffect(() => {
    window.scroll(0, 0);
    getUserByDepartmentSlug(slug).then((data) => {
      if (data) {
        setUserDepartment(data.items);
      } else {
        setUserDepartment({});
      }
      setIsVisibleLoading(false);
    });
  }, [slug]);

  return (
    <>
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <>
          <div className="row">
            {useDepartment.length > 0 ? (
              useDepartment.map((item, index) => (
                <div className="col-6 " key={index}>
                  <div className="card mt-3 card-content d-flex flex-row justify-content-between">
                    <div className="d-flex">
                      <FontAwesomeIcon
                        icon={faUser}
                        fontSize={50}
                        className="px-3 text-success"
                      />
                      <div className="d-flex flex-column">
                        <Link
                          className="text-success text-decoration-none"
                          to={`/records/${item.urlSlug}`}
                        >
                          <div className="text-name">Họ tên: {item.name}</div>
                        </Link>

                        {item.email === null ? (
                          <span className="text-danger">
                            Email: Tác giả chưa cập nhật email
                          </span>
                        ) : (
                          <Link
                            className="text-danger text-decoration-none"
                            to={`mailto:${item.email}`}
                          >
                            Email: {item.email}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-warning text-center py-3">
                Không tìm thấy nhà khoa học
              </h2>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default UserInDepartment;

import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { deletePost, getAllPost } from "../../../api/PostApi";
import Loading from "../../../components/user/Loading";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import PostFilter from "../../../components/user/filter/PostFilterModel";
import { useSelector } from "react-redux";
import { getFilterPost } from "../../../api/PostApi";
import { useSnackbar } from "notistack";
import Pager from "../../../components/pager/Pager";

const PostAdmin = ({postQuery}) => {
  const {querySearch, params}= "";
  const[metadata, setMetadata]= useState({})
  const [pageNumber, setPageNumber]= useState(1);
  const [getPost, setGetPost] = useState([{
    items:[],
    metadata:{}
  }]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true),
    postFilter = useSelector((state) => state.postFilter);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [reRender, setRender] = useState(false);

  let { id } = useParams,
    p = 1,
    ps = 10;
    function updatePageNumber(inc){
      setPageNumber((curentVal)=> curentVal+ inc)
    }
  
  useEffect(() => {
   loadPost();
   async function loadPost(){
    const parameters = new URLSearchParams({
       pageNumber: Object.fromEntries(querySearch|| '').length> 0 ? 1: pageNumber||1,
      
      pageSize: 2,
      ...Object.fromEntries(querySearch||""),
      ...params
    });
    function setData(props){
      setGetPost(
        props.items
      );
       setMetadata(props.metadata);

    }
    getFilterPost(parameters.title, parameters.shortDescription, parameters.pageSize, pageNumber).then(
      (data) => {
        if (data) {
          
         setData(data);
        } else {
          setGetPost([]);
        }
        
        setIsVisibleLoading(false);
      }
    );

    console.log(getPost);
   }


    
  }, [postFilter, ps, p, reRender, pageNumber,params]);
  
  const hanldeDeletePost = (e, id) => {
    e.preventDefault();
    DeletePost(id);
    async function DeletePost(id) {
      if (window.confirm("Bạn có muốn xoá bài đăng này")) {
        const response = await deletePost(id);
        if (response) {
          enqueueSnackbar("Đã xoá thành công", {
            variant: "success",
          });
          setRender(true);
        } else {
          enqueueSnackbar("Đã xoá thành công", {
            variant: "error",
          });
        }
      }
    }
  };

  return (
    
      <div className="row">
        <Navbar />
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div className="title py-3 text-danger">
            <h3>Quản lý đăng bài công trình khoa học</h3>
          </div>
          <div className="post-content">
            <PostFilter />
            <Link className="btn btn-success mb-2" to={`/admin/post/edit`}>
              Thêm mới <FontAwesomeIcon icon={faAdd} />
            </Link>
            {isVisibleLoading ? (
              <Loading />
            ) : (
              <Table striped responsive bordered>
                <thead>
                  <tr>
                    <th>Tên bài đăng</th>
                    <th>Mô tả</th>
                    <th>Ngày đăng</th>
                    <th>Đăng bởi</th>
                    <th>Trạng thái</th>
                    <th>Sửa</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {getPost.length > 0 ? (
                    getPost.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.shortDescription}</td>
                        <td>{format(new Date(item.created), "dd/MM/yyyy")}</td>
                        <td>{item.user?.name}</td>
                        <td>{item.status ? (
                          <div className="text-success">Đã phê duyệt</div>
                        ): (
                          <div className="text-danger">Chưa phê duyệt</div>
                        )}</td>
                        <td className="text-center">
                          <Link to={`/admin/post/edit/${item.id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                        </td>
                        <td className="text-center">
                          <div onClick={(e) => hanldeDeletePost(e, item.id)}>
                            <FontAwesomeIcon icon={faTrash} color="red" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <h4 className="text-danger text-center">
                          Không tìm thấy bài viết nào
                        </h4>
                      </td>
                    </tr>
                  )}
                   
                </tbody>
                
              </Table>
              
            )
            
            }
             <Pager metadata={metadata}
        
             onPageChange={updatePageNumber}/>
            
          </div>
        
        </div>
      </div>
      
    
    
  );
};
export default PostAdmin;
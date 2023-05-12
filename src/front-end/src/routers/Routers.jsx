import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/user/Home";
import Department from "../pages/user/Department";
import Research from "../pages/user/Research";
import Record from "../pages/user/Records";
import Contact from "../pages/user/Contact";
import DepartmentDetail from "../pages/user/DepartmentDetail";
import PostDetail from "../pages/user/PostDetail";
import SearchPost from "../components/user/search/SearchPost";
import ResearcherDetail from "../pages/user/ResearcherDetail";
import LayoutAdmin from "../components/admin/layout/LayoutAd";
import ResearchAdmin from "../pages/admin/researchers/ResearcherAd";
import ProjectAdmin from "../pages/admin/projects/ProjectAd";
import DepartmentAdmin from "../pages/admin/departments/DepartmentAd";
import DepartmentEditAdmin from "../pages/admin/departments/DepartmentAdEdit";
import ResearchEditAdmin from "../pages/admin/researchers/ResearcherAdEdit";
import ProjectAdminEdit from "../pages/admin/projects/ProjectAdEdit";
import PostAdmin from "../pages/admin/posts/PostAd";
import PostAdminEdit from "../pages/admin/posts/PostAdEdit";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
      {/* routers user */}
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<PostDetail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:slug" element={<ResearcherDetail />} />
        <Route path="/department" element={<Department />} />
        <Route path="/department/:slug" element={<DepartmentDetail />} />
        <Route path="/research" element={<Research/>}/>
        <Route path="/research/:slug" element={<PostDetail/>}/>
        <Route path="/research/researcher/:slug" element={<ResearcherDetail/>}/>
        <Route path="/records" element={<Record/>}/>
        <Route path="/records/:slug" element={<DepartmentDetail/>}/>
        <Route path="/records/researcher/:slug" element={<ResearcherDetail/>}/>
        <Route path="/contact" element={<Contact/>}/>

        <Route path="/search" element={<SearchPost />} />
        <Route path="/home/search" element={<SearchPost />} />




      {/* routers admin */}

        <Route path="/admin" element = {<LayoutAdmin/>}/>
        <Route path="/admin/researcher" element = {<ResearchAdmin/>}/>
        <Route path="/admin/researcher/edit" element = {<ResearchEditAdmin/>}/>
        <Route path="/admin/researcher/edit/:id" element = {<ResearchEditAdmin/>}/>
        <Route path="/admin/project" element = {<ProjectAdmin/>}/>
        <Route path="/admin/project/edit" element = {<ProjectAdminEdit/>}/>
        <Route path="/admin/project/edit/:id" element = {<ProjectAdminEdit/>}/>
        <Route path="/admin/post" element = {<PostAdmin/>}/>
        <Route path="/admin/post/edit" element = {<PostAdminEdit/>}/>
        <Route path="/admin/post/edit/:id" element = {<PostAdminEdit/>}/>
        <Route path="/admin/department" element = {<DepartmentAdmin/>}/>
        <Route path="/admin/department/edit" element = {<DepartmentEditAdmin/>}/>
        <Route path="/admin/department/edit/:id" element = {<DepartmentEditAdmin/>}/>





      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

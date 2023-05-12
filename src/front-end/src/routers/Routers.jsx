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
        <Route path="/admin/project" element = {<ProjectAdmin/>}/>



      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

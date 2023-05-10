import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/user/Home";
import Department from "../pages/user/Department";
import Research from "../pages/user/Research";
import Record from "../pages/user/Records";
import Contact from "../pages/user/Contact";
import DepartmentDetail from "../pages/user/DepartmentDetail";
import PostDetail from "../pages/user/PostDetail";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
      {/* routers user */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:slug" element={<PostDetail />} />
        <Route path="/department" element={<Department />} />
        <Route path="/department/:slug" element={<DepartmentDetail />} />
        <Route path="/research" element={<Research/>}/>
        <Route path="/research/:slug" element={<PostDetail/>}/>
        <Route path="/records" element={<Record/>}/>
        <Route path="/contact" element={<Contact/>}/>





      {/* routers admin */}

      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

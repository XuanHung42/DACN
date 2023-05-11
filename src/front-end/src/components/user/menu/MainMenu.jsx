import React from "react";
import MenuItem from "./MenuItems";
// import './styles/style.scss';
const MainMenu = () => {
  return (
    <ul className="navbar-nav ">
      <MenuItem link="/home" title={"Trang chủ"}/>
      <MenuItem link={"/department"} title="Đơn vị khoa"/>
      <MenuItem link={"/research"} title="Kết quả nghiên cứu"/>
      <MenuItem link={"/records"} title="Hồ sơ khoa học"/>
      <MenuItem link={"/contact"} title="Liên hệ"/>
    </ul>
  )
}

export default MainMenu;
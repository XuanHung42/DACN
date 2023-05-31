import React, { useState } from "react";

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";

const Login = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <>
    <Header/>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Đăng nhập
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Đăng ký
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <div className="text-center mb-5"></div>

            <MDBInput
              wrapperClass="mb-4"
              label="Tên đăng nhập"
              id="form1"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Mật khẩu"
              id="form2"
              type="password"
            />

        
            <Button className="mb-4 w-100">Đăng nhập</Button>
            <p className="text-center">
              Bạn chưa có tài khoản? Bấm đăng ký ngay
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <div className="text-center mb-5"></div>

            {/* <MDBInput wrapperClass="mb-4" label="Name" id="form1" type="text" /> */}
            <MDBInput
              wrapperClass="mb-4"
              label="Tên đăng nhập"
              id="form1"
              type="text"
            />
            {/* <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
            /> */}
            <MDBInput
              wrapperClass="mb-4"
              label="Mật khẩu"
              id="form1"
              type="password"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Nhập lại mật khẩu"
              id="form1"
              type="password"
            />


            <Button className="mb-4 w-100">Sign up</Button>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    <Footer/>
    </>
  );
};
export default Login;

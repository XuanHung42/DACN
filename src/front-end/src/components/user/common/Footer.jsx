import React from "react";
import logo from "../image/logo_dlu.png";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer bg-success mt-5 text-white">
      <div className="container py-5">
        <div className="row">
          <div className="col-4 text-center">
            <Image src={logo} alt="logo" />
            <h3 className="text-center text-white mt-3">
              Trường Đại học Đà Lạt
            </h3>
          </div>
          <div className="col-4">
            <h3 className="text-center">Thông tin</h3>
            <div className="mt-3">
              <div className="infor-list mt-2">
                Địa chỉ:
                <Link
                  className="text-decoration-none text-white px-3"
                  to={`https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+H%E1%BB%8Dc+%C4%90%C3%A0+L%E1%BA%A1t/@11.95456,108.444205,16z/data=!4m6!3m5!1s0x317112d959f88991:0x9c66baf1767356fa!8m2!3d11.9545604!4d108.4442049!16s%2Fm%2F02rtwnx?hl=vi`}
                  target="blank"
                >
                  Số 1 Phù Đổng Thiên Vương - P8 - TP.Đà Lạt
                </Link>
              </div>
              <div className="infor-list mt-3">
                SĐT:
                <Link
                  className="text-decoration-none text-white px-3"
                  to={`tel`}
                >
                  0966668888
                </Link>
              </div>
              <div className="infor-list mt-3">
                Fax
                <Link
                  className="text-decoration-none text-white px-3"
                  to={`tel`}
                >
                  0263.3823380
                </Link>
              </div>
              <div className="infor-list mt-3">
                Email
                <Link
                  className="text-decoration-none text-white px-3"
                  to={`tel`}
                >
                  info@dlu.edu.vn
                </Link>
              </div>
              <div className="infor-list mt-3">
                Facebook
                <Link
                  className="text-decoration-none text-white px-3"
                  target="blank"
                  to={`https://www.facebook.com/`}
                >
                  Trường Đại học Đà Lạt
                </Link>
              </div>
            </div>
          </div>
          <div className="col-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.2877902405253!2d108.44201621412589!3d11.95456563961217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112d959f88991%3A0x9c66baf1767356fa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkMOgIEzhuqF0!5e0!3m2!1svi!2s!4v1633261535076!5m2!1svi!2s"
              width="100%"
              height="250px"
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
              title="map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

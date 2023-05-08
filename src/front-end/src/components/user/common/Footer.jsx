import React from "react";
import logo from "../image/logo_dlu.png";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFax,
  faLocationDot, faMailBulk, faPager, faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer bg-success mt-5 text-white">
      <div className="container py-3">
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
                <FontAwesomeIcon icon={faLocationDot} />
                <Link
                  className="text-decoration-none text-white px-3"
                  to={`https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+H%E1%BB%8Dc+%C4%90%C3%A0+L%E1%BA%A1t/@11.95456,108.444205,16z/data=!4m6!3m5!1s0x317112d959f88991:0x9c66baf1767356fa!8m2!3d11.9545604!4d108.4442049!16s%2Fm%2F02rtwnx?hl=vi`}
                  target="blank"
                >
                  Số 1 Phù Đổng Thiên Vương - P8 - TP.Đà Lạt
                </Link>
              </div>
              <div className="infor-list mt-3">
                <FontAwesomeIcon icon={faPhone} />
                <Link
                  className="text-decoration-none text-white px-3"
                  to={"tel:0989962356"}
                >
                  0966668888
                </Link>
              </div>
              <div className="infor-list mt-3">
              <FontAwesomeIcon icon={faFax} />
                <Link
                  className="text-decoration-none text-white px-3"
                  to={"tel:0989962356"}
                >
                  0922226666
                </Link>
              </div>
              <div className="infor-list mt-3">
              <FontAwesomeIcon icon={faMailBulk} />
                <Link
                  className="text-decoration-none text-white px-3"
                  to={"mailto:2012254@dlu.edu.vn"}
                >
                  info@dlu.edu.vn
                </Link>
              </div>
              <div className="infor-list mt-3">
                <FontAwesomeIcon icon={faPager}/>
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
              style={{ border: 0 }}
              aria-hidden="false"
              title="map"
            ></iframe>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom py-3">
        <div className="text-center">
          Coypyright &copy; 2023 by
          <Link
            to={"https://www.facebook.com/tran.duat.2368"}
            target="_blank"
            className="text-decoration-none px-1 text-white"
          >
            Hung Duat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useRef } from "react";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import emailjs from '@emailjs/browser';
import { useSnackbar } from "notistack";

const Contact = () => {

  const form = useRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_zzmtzvh', 'template_qeerh7w', form.current, 'XsTZC2H1dQ4aImZ2-')
      .then((result) => {
          // console.log(result.text);
          enqueueSnackbar("Cảm ơn bạn vì đã phản hồi ", {
            variant: "success",
          }); 
      }, (error) => {
          // console.log(error.text);
          enqueueSnackbar("Xảy ra lỗi khi phản hồi", {
            variant: "error",
          }); 
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row card mt-3">
          <div className="row">
            <div className="col-6">
              <div className="card-header">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <span className="text-success px-3">
                  Gửi ý kiến của bạn tại đây
                </span>
              </div>
              <div className="card-body">
                <form ref={form} onSubmit={sendEmail}>
                  <div className="form-group">
                    <input
                      id="name"
                      type="text"
                      name="user_name"
                      className="form-control"
                      placeholder="Nhập tên của bạn"
                      required
                    ></input>
                  </div>
                  <div className="form-group py-3">
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="user_email"
                      placeholder="Nhập Email của bạn"
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <textarea
                      id="content"
                      type="text"
                      rows={6}
                      className="form-control"
                      name="text_message"
                      placeholder="Nhập nội dung"
                      required
                    ></textarea>
                  </div>
                  <br />
                  <div className="justify-content-center d-flex">
                    <Button type="submit" value="Send" className="btn btn-primary">
                      Gửi phản hồi
                    </Button>
                  </div>
                </form>
              </div>
            </div>


            {/* <script>
              const name = document.getElementById('name')
              const email = document.getElementById('email')
              const content = document.getElementById('content')
              submit.addEvenetListener

            </script> */}



            <div class="col-6">
              <div class="card-header">
                <FontAwesomeIcon icon={faLocationDot} />
                <span class="text-success px-3">Bản đồ</span>
              </div>
              <div class="card-body">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.2877902405253!2d108.44201621412589!3d11.95456563961217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112d959f88991%3A0x9c66baf1767356fa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkMOgIEzhuqF0!5e0!3m2!1svi!2s!4v1633261535076!5m2!1svi!2s"
                  width="100%"
                  height="360px"
                  style={{ border: 0 }}
                  aria-hidden="false"
                  tabindex="0"
                  title="map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contact;

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/banner.scss";

const SearchBox = () => {
  return (
    <div className=" d-flex justify-content-center">
      <Form className="searchbox d-flex">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo từ khoá"
          required
        />
        <Button type="submit">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </Button>
      </Form>
    </div>
  );
};
export default SearchBox;

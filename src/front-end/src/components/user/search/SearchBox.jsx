import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/banner.scss";
import { useState } from "react";

const SearchBox = () => {
  const keyword = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location = `/home/search?k=${keyword.current.value}`;
  };
  return (
    <div className=" d-flex justify-content-center">
      <Form className="searchbox d-flex" method="get" onSubmit={handleSubmit}>
        <Form.Group className="input-group">
          <Form.Control
            type="text"
            name="k"
            ref={keyword}
            placeholder="Tìm kiếm theo từ khoá"
            required
            aria-describedby='btnSearchPost'
          />
          <Button type="submit" id='btnSearchPost' >
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
export default SearchBox;

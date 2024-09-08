/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./header/header.css";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ handleLinkClick }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex m-auto mt-2">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        className="search-field"
        placeholder="Search a product..."
      />
      <button className="search-btn" onClick={handleLinkClick}>
        <FaSearch />
      </button>
    </Form>
  );
};

export default SearchBox;

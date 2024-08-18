/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { FaCartPlus } from "react-icons/fa";

const Product = ({ product }) => {
  return (
    <Card

      style={{ backgroundColor: "#F5F7F8" }}
      className="border-0 my-3 p-3"
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="rounded-3" />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title
            as="div"
            className="text-dark"
            style={{ textDecoration: "underline" }}
          >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="my-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text className="d-flex justify-content-between align-items-center mt-auto">
          <span className="mb-0">${product.price}</span>
          <FaCartPlus
            className="fs-5 text-info"
            style={{ cursor: "pointer" }}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    // Adding the product to the cart with a default quantity of 1
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <div style={{ backgroundColor: "#F5F7F8" }} className="border-0 my-3 p-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="rounded-1 " />
      </Link>

      <Card.Body className="d-flex flex-column mt-3">
        <Link to={`/product/${product._id}`} className="text-decoration">
          <Card.Title as="div" className="text-secondary">
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
          <span className="mb-0 text-success" style={{ fontSize: "17px" }}>
            ${product.price}
          </span>
          <MdAddShoppingCart
            className="fs-5 "
            style={{ cursor: "pointer" }}
            onClick={addToCartHandler}
          />
        </Card.Text>
      </Card.Body>
    </div>
  );
};

export default Product;

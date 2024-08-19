import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

import { MdAddShoppingCart } from "react-icons/md";
import Rating from "../components/Rating";
import Skeleton from "react-loading-skeleton";
import { useGetProductDetailsQuery } from "../redux/features/productsApiSlice";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  let { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        <div>
          <span>Go Back</span>
        </div>
      </Link>

      {isLoading ? (
        <Skeleton height={250} />
      ) : isError ? (
        <div>Error: {error?.data?.message || error?.message}</div>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>qyt:</Col>
                      <Col>
                        <FormSelect
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormSelect>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem className="m-auto">
                  <Button
                    className="btn-block d-flex justify-content-between align-items-center gap-1"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    <span>Add To Cart</span>
                    <MdAddShoppingCart
                      className="fs-5"
                      style={{ cursor: "pointer" }}
                    />
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductPage;

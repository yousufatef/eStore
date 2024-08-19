import {
  Alert,
  Button,
  Card,
  Col,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeItemHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: "25px" }}>Shopping Cart</h1>
          <ListGroup variant="flush">
            {cartItems.length === 0 ? (
              <Alert variant="danger">
                Your cart is empty! <Link to="/">Go Back</Link>
              </Alert>
            ) : (
              cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="fluid rounded"
                        style={{ width: "80px", height: "80px" }}
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormSelect
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, parseInt(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormSelect>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeItemHandler(item._id)}
                      >
                        <MdDelete className="text-danger" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>
                    <h4>
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}){" "}
                      <span>items</span>
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={() => navigate("/checkout")}
                >
                  <span>Process To Checkout</span>
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;

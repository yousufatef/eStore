import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckOutSteps";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useCreateOrderMutation } from "../redux/api/ordersApiSlice";
import { clearCartItems } from "../redux/features/cartSlice";
import { toast } from "react-toastify";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { paymentMethod } = cart;
  const { cartItems } = cart;
  const { itemsPrice } = cart;
  const { shippingPrice } = cart;
  const { taxPrice } = cart;
  const { totalPrice } = cart;

  const [createOrder] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    if (!userInfo) {
      navigate("/login");
      toast.error("Please log in to place an order");
      return;
    }

    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, shippingAddress, paymentMethod]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>
                    <h4>Order Summary</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>Items: </Col>
                  <Col>${itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total: </Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  <span>Place Order</span>
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;

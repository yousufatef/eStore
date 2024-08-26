import {
  Button,
  Col,
  Form,
  FormCheck,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import CheckoutSteps from "../components/CheckOutSteps";
import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/features/cartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onClick={submitHandler}>
        <FormGroup>
          <FormLabel as="legend">Select Method</FormLabel>
          <Col>
            <FormCheck
              type="radio"
              label="PayPal or Credit Card"
              className="my-2"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;

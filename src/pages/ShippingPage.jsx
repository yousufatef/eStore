import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../redux/features/cartSlice";
import CheckoutSteps from "../components/CheckOutSteps";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [inputField, setInputField] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const { address, city, postalCode, country } = inputField;
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="my-2" controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Address"
            required
            value={inputField.address}
            onChange={(e) =>
              setInputField((prevState) => ({
                ...prevState,
                address: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup className="my-2" controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter City"
            required
            value={inputField.city}
            onChange={(e) =>
              setInputField((prevState) => ({
                ...prevState,
                city: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup className="my-2" controlId="postalCode">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Postal Code"
            required
            value={inputField.postalCode}
            onChange={(e) =>
              setInputField((prevState) => ({
                ...prevState,
                postalCode: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup className="my-2" controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Country"
            required
            value={inputField.country}
            onChange={(e) =>
              setInputField((prevState) => ({
                ...prevState,
                country: e.target.value,
              }))
            }
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;

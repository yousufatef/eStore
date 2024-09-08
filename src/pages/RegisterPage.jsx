import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/usersApiSlice";
import { setCredentials } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const RegisterPage = () => {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password } = inputField;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        const accessToken = res.accessToken; 

        if (accessToken) {
          Cookies.set("accessToken", accessToken);
        }

        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
};

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="my-2" controlId="name">
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter name"
            value={inputField.name}
            onChange={(e) =>
              setInputField((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup className="my-2" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter email"
            value={inputField.email}
            onChange={(e) =>
              setInputField((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup className="my-2" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter Password"
            value={inputField.password}
            onChange={(e) =>
              setInputField((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup className="my-2" controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <Button disabled={isLoading} type="submit" variant="primary">
          {!isLoading ? "Sign Up" : "Submitting"}
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;

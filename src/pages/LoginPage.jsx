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
import { useLoginMutation } from "../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const { email, password } = inputField;
      const res = await login({ email, password }).unwrap();
      const accessToken = res.accessToken;
      console.log(accessToken);
      if (accessToken) {
        Cookies.set("accessToken", accessToken);
      }
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
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
        <Button disabled={isLoading} type="submit" variant="primary">
          {!isLoading ? "Sign In" : "Submitting"}
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;

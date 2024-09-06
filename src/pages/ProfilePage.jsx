import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../redux/api/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/features/authSlice";
import { useGetMyOrdersQuery } from "../redux/api/ordersApiSlice";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const ProfilePage = () => {
  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setUserInputs({
        name: userInfo.name,
        email: userInfo.email,
      });
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userInputs.password !== userInputs.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const data = await updateProfile({
          _id: userInfo._id,
          name: userInputs.name,
          email: userInputs.email,
          password: userInputs.password,
        }).unwrap();
        dispatch(setCredentials(data));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };

  return (
    <Row>
      <Col sm={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name" className="my-2">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter name"
              value={userInputs.name}
              onChange={(e) =>
                setUserInputs({ ...userInputs, name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup controlId="email" className="my-2">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              value={userInputs.email}
              onChange={(e) =>
                setUserInputs({ ...userInputs, email: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup controlId="password" className="my-2">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={userInputs.password}
              onChange={(e) =>
                setUserInputs({ ...userInputs, password: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" className="my-2">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter confirm Password"
              value={userInputs.confirmPassword}
              onChange={(e) =>
                setUserInputs({
                  ...userInputs,
                  confirmPassword: e.target.value,
                })
              }
            />
          </FormGroup>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped table hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <tD>{order._id}</tD>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;

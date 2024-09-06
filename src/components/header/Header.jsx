import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaOpencart, FaUser } from "react-icons/fa";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingBag4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../redux/features/authSlice.js";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import Cookies from "js-cookie";
import SearchBox from "../SearchBox";
const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    setExpanded(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApi(); // Ensure logout is awaited
      dispatch(logout());
      Cookies.remove("accessToken");
      navigate("/login");
      handleLinkClick();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {}, [userInfo]);

  return (
    <header>
      <Navbar
        bg="dark"
        expanded={expanded}
        onToggle={handleToggle}
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={handleLinkClick}
            className="d-flex align-items-center justify-content-center"
          >
            <RiShoppingBag4Line className="fs-1 me-1" />
            <span className="text-center">
              <strong>Elagamy</strong>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox handleLinkClick={handleLinkClick} />
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                onClick={handleLinkClick}
                to="/cart"
                className="d-flex justify-content-center flex-column mt-lg-0 mt-2"
                style={{ position: "relative" }}
              >
                <FaOpencart className="fs-3" />
                {cartItems.length > 0 ? (
                  <span className="bg-success cart-value">
                    {cartItems.reduce((curr, item) => curr + item.qty, 0)}
                  </span>
                ) : (
                  <span className="bg-primary cart-value">0</span>
                )}
              </Nav.Link>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item
                      as={Link}
                      onClick={handleLinkClick}
                      to="/profile"
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Link to="/login">
                  <button onClick={handleLinkClick} className="login-btn">
                    <FaUser /> Login
                  </button>
                </Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item
                    as={Link}
                    onClick={handleLinkClick}
                    to="/admin/product-list"
                  >
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    onClick={handleLinkClick}
                    to="/admin/order-list"
                  >
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    onClick={handleLinkClick}
                    to="/admin/user-list"
                  >
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

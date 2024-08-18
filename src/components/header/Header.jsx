import { Navbar, Nav, Container, NavDropdown, Form } from "react-bootstrap";
import { FaOpencart, FaSearch, FaUser } from "react-icons/fa";
import "./header.css";
import { Link } from "react-router-dom";
import { RiShoppingBag4Line } from "react-icons/ri";

const Header = () => {
  const userInfo = {
    isAdmin: true,
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center justify-content-center"
          >
            <RiShoppingBag4Line className="fs-1 me-1" />
            <span className="text-center">
              <strong>Elagamy</strong>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex m-auto mt-2">
              <input
                type="text"
                className="search-field"
                placeholder="Search a product..."
              />

              <button className="search-btn">
                <FaSearch />
              </button>
            </Form>
            <Nav className="ms-auto">
              <Nav.Link
                className="d-flex justify-content-center flex-column mt-lg-0 mt-2"
                style={{ position: "relative" }}
              >
                <FaOpencart className="fs-3" />
                <span className="cart-value">5</span>
              </Nav.Link>

              {userInfo ? (
                <>
                  <NavDropdown title="joe" id="username">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item as={Link} to="/products">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/users">
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

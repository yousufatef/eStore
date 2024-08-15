import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./header.css";

const Header = () => {
  const userInfo = {
    isAdmin: true,
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>eStore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>

              <Nav.Link>
                <FaShoppingCart /> Cart
                <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                  5
                </Badge>
              </Nav.Link>

              {userInfo ? (
                <>
                  <NavDropdown title="joe" id="username">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  <NavDropdown.Item>Users</NavDropdown.Item>
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

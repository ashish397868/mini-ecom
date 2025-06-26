import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import "./index.css";

function Header() {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const cartCount = cartItems.length;
  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container> 
        <Navbar.Brand as={Link} to="/">
          QuickCart
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
            {cartCount > 0 && (
          <Nav.Link as={Link} to="/cart" className="position-relative right-most">
            <FaShoppingCart size={20} />
              <Badge bg="primary" pill className="position-absolute top-1 start-100 translate-middle">
                {cartCount}
              </Badge>
          </Nav.Link>
            )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;

import { Card, Button, Badge } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import {Link} from "react-router-dom"

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products.products);
  const cartProducts = cartItems.map((ci) => products.find((p) => p.id === ci.id)).filter(Boolean);
  const subtotal = cartProducts.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2);

  return (
    <div className="container my-5">
      <h3 className="mb-4">Shopping Cart</h3>

      <div className="row ">
        <div className="col-lg-8 custom-scroll">
          {cartProducts.length === 0 ? (
            <div className="text-center text-muted py-5">Your cart is empty.</div>
          ) : (
            
            cartProducts.map((item) => (
              <Card className="mb-3 shadow-sm" key={item.id}>
                <Card.Body className="d-flex align-items-center justify-content-between flex-wrap">
                  <Link to={`/products/${item.id}`} className="text-decoration-none text-dark">
                  <div className="d-flex align-items-center">
                    <img src={item.thumbnail || item.image} alt={item.title} width="80" height="80" className="me-3" style={{ objectFit: "contain" }} />
                    <div>
                      <h6 className="mb-1">{item.title}</h6>
                      <small className="text-muted">{item.brand}</small>
                      <div className="text-danger fw-bold mt-1">
                        ${item.price.toFixed(2)}{" "}
                        <Badge bg="warning" text="dark">
                          {item.discountPercentage ? item.discountPercentage.toFixed(2) : 0}% OFF
                        </Badge>
                      </div>
                      <small className="text-success">{item.stockStatus || "In Stock"}</small>
                    </div>
                  </div>
                  </Link>

                  <Button variant="outline-danger" className="ms-3" onClick={() => dispatch(removeFromCart(item.id))}>
                    <FaTrash />
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        <div className="col-lg-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h6>
                Subtotal ({cartProducts.length} items): <span className="text-success fw-bold">${subtotal}</span>
              </h6>
              <Button variant="warning" className="w-100 mt-3 fw-bold" disabled={cartProducts.length === 0}>
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default ShoppingCart;

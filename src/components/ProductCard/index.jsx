import { Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import "./index.css";

const ProductCard = ({ item }) => {
  const discountedPrice = item.price;
  const discount = item.discountPercentage;
  const originalPrice = (discountedPrice / (1 - discount / 100)).toFixed(2);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const handleCartClick = () => {
    if (itemInCart) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart(item));
    }
  };

  return (
    <Card className="shadow-sm h-100 border-0 rounded product-card-box">
      <Link to={`/products/${item.id}`} className="text-decoration-none text-dark">
        <Card.Img variant="top" loading="lazy" src={item.thumbnail} className="product-img" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6">{(item.title + " | " + item.description).substring(0, 70)}...</Card.Title>

          <Card.Text className="text-warning mb-1 fs-6">
            <FaStar /> {item.rating || 4.2}
          </Card.Text>

          <Card.Text className="mb-1">
            <span className="fw-bold">${discountedPrice}</span> <span className="text-muted text-decoration-line-through">${originalPrice}</span> <span className="text-success fw-bold">({discount}% off)</span>
          </Card.Text>

          <Card.Text className="product-shipping mb-3">{item.shippingInformation || "FREE Ships in 3-5 business days"}</Card.Text>
        </Card.Body>
      </Link>
      <Card.Body className="pt-0">
        <div className="mt-auto">
          <Button className={`w-100 fw-semibold text-dark ${itemInCart ? "light-pink" : "btn-warning"}`} onClick={handleCartClick}>
            {itemInCart ? "Remove from cart" : "Add to cart"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
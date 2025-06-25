import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { productHandler } from "../../shared/apihandler";
import { Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import "./index.css";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const fetchProducts = async (initial = false) => {
    if (initial) setLoading(true);
    else setLoadingMore(true);

    const data = await productHandler(skip, limit);

    if (data && data.products) {
      setProductData((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + limit);
    }

    if (initial) setLoading(false);
    else setLoadingMore(false);
  };

  useEffect(() => {
    fetchProducts(true); // initial fetch
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const bottomReached = scrollTop + windowHeight >= documentHeight - 100;

    if (bottomReached && !loadingMore && productData.length < 100) {
      fetchProducts(false); // fetch more products
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, productData.length]);

  return (
    <Container className="mt-4">
      <Row>
        {loading && (
          <div className="loading-container">
            <ClipLoader color="#1b1a75" margin={5} size={50} />
          </div>
        )}

        {!loading &&
          productData.map((product) => (
            <Col key={product._id || product.id} md={4} className="mb-4">
              <ProductCard item={product} />
            </Col>
          ))}

        {loadingMore && (
          <div className="loading-container">
            <ClipLoader color="#1b1a75" size={15} />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;

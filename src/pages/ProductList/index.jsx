import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { productHandler } from "../../shared/apihandler";
import { Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, appendProducts, setLoading, setLoadingMore } from "../../redux/productSlice";
import "./index.css";

const ProductList = () => {
  const { products, loading, loadingMore } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const maxTotal = 100;

  const fetchProducts = async (isInitial = false) => {
    try {
      if (isInitial) {
        dispatch(setLoading(true)); 
        dispatch(setProducts([]));
        setSkip(0);
      } else {
        dispatch(setLoadingMore(true));
      }

      const response   = await productHandler(skip, limit);
      const newProducts = response.products;

      if (newProducts?.length) {
        if (isInitial) {
          dispatch(setProducts(newProducts)); 
        } else {
          dispatch(appendProducts(newProducts)); 
        }
        setSkip((s) => s + limit); //increment skip by 10
      }
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      dispatch(setLoading(false));
      dispatch(setLoadingMore(false));
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(true);
    } else {
      setSkip(products.length);
    }
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const nearBottom = scrollTop + windowHeight >= documentHeight - 100;

    if (nearBottom && !loadingMore && products.length < maxTotal) {
      if (products.length > skip) {
        setSkip(products.length);
      } else {
        fetchProducts(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, products.length, skip]);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="loading-container">
          <ClipLoader color="#1b1a75" size={50} />
        </div>
      ) : (
        <Row>
          {products.map((p) => (
            <Col key={p.id} md={4} className="mb-4">
              <ProductCard item={p} />
            </Col>
          ))}
        </Row>
      )}

      {loadingMore && ( 
        <div className="loading-container">
          <ClipLoader color="#1b1a75" size={50} />
        </div>
      )}
    </Container>
  );
};

export default ProductList;
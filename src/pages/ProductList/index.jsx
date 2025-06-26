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
  
  const handleFetchProductsMore=async()=>{
    if(products.length>0){
      dispatch(setLoadingMore(true));
      setSkip((prev) => prev + limit);
      // console.log(skip)
      const response = await productHandler(skip, limit);
      dispatch(appendProducts(response.products))
      dispatch(setLoadingMore(false));
    }
  }

  useEffect(() => {
    if (products.length === 0) {
      handleInitialFetch();
    }
  }, []);

  const handleInitialFetch = async () => {
    dispatch(setLoading(true));
    const response = await productHandler(0, limit);
    dispatch(setProducts(response.products));
    dispatch(setLoading(false));
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const nearBottom = scrollTop + windowHeight >= documentHeight-100;
    if (nearBottom && products.length < maxTotal) {
       handleFetchProductsMore()
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, products.length]);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="loading-container">
          <ClipLoader color="#1b1a75" size={50} />
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <ProductCard item={product} />
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
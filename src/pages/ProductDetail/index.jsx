import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../shared/apihandler";
import Style from "./productDetail.module.css";
import { Badge, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { RiSpeakAiFill } from "react-icons/ri";
import Carousel from "react-bootstrap/Carousel";
import { ClipLoader } from "react-spinners";

const Index = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  let discountedPrice = 0,
    originalPrice = 0,
    discount = 0;

  if (product) {
    discountedPrice = product.price;
    discount = product.discountPercentage;
    originalPrice = +(discountedPrice / (1 - discount / 100)).toFixed(2);
  }

  return (
    <>
    <section id={Style.productDetails}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <ClipLoader color="#1b1a75" size={50} />
        </div>
      ) : product ? (
        <>
          <div id={Style.container}>
            <div className={Style.left}>
              {product.images?.length > 1 ? (
                <Carousel variant="dark">
                  {product.images.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img className={Style.productImg} src={img} alt={`Slide ${index}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img className={Style.productImg} src={product.images[0]} alt={product.title} />
              )}
            </div>

            <div className={Style.right}>
              <h2>{product.title}</h2>
              <h6 className="product-shipping">{product.brand}</h6>

              <div>
                <Badge className="me-2" bg="success">
                  {product.availabilityStatus}
                </Badge>
                <Badge bg="info">{product.category}</Badge>
              </div>

              <div className="mt-4 fs-4">
                <span className="fw-bold text-primary">${discountedPrice}</span>
                <span className="fw-bold text-muted text-decoration-line-through ms-2">${originalPrice.toFixed(2)}</span>
                <Badge bg="danger" className="ms-2">
                  ({discount}% off)
                </Badge>
              </div>

              <p className="mt-3">{product.description}</p>

              <p className="mb-1 fs-6">
              <span className="fw-bold">Rating : </span>  <FaStar className="text-warning" /> {product.rating}
              </p>
              <p className="mb-1 fs-6"><span className="fw-bold">Stock: </span> {product.stock}</p>
              <p className="mb-1 fs-6"><span className="fw-bold">Dimensions: </span>
                 {product.dimensions?.width}W × {product.dimensions?.height}H × {product.dimensions?.depth}D
              </p>
              <p className="mb-1 fs-6"><span className="fw-bold">Weight:</span>  {product.weight}</p>
              <p className="mb-1 fs-6"><span className="fw-bold">Shipping:</span>  {product.shippingInformation}</p>
              <p className="mb-1 fs-6"><span className="fw-bold">Warranty:</span>  {product.warrantyInformation}</p>
              <p className="mb-1 fs-6"><span className="fw-bold">Return Policy:</span>  {product.returnPolicy}</p>
              <p className="mb-1 fs-6"><span className="fw-bold">Sku: </span> {product.sku}</p>

              <div>
                <span><span className="fw-bold">Tags: </span> </span>
                {product.tags?.map((tag) => (
                  <Badge key={tag} className="me-2" bg="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          {product.reviews?.length > 0 && (
            <div className="mt-5 px-4 pb-4">
              <h4 className="mb-4">
                <RiSpeakAiFill className="me-2 text-primary" /> Customer Reviews
              </h4>
              {product.reviews.map((review, index) => (
                <Card key={index} className="mb-3 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start flex-wrap">
                      <div>
                        <h6 className="mb-1">
                          <FaStar className="text-warning me-1" />
                          {review.rating} – {review.reviewerName}
                        </h6>
                        <p className="mb-0">{review.comment}</p>
                      </div>
                      <small className="text-muted text-end">
                        {review.date} <br /> {review.reviewerEmail}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : null}
    </section>
    </>
  );
};

export default Index;

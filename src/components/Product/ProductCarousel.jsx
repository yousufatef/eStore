/* eslint-disable react/prop-types */
import { Alert, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCarouselSkeleton from "./ProductCarouselSkeleton";
import { useGetTopProductsQuery } from "../../redux/api/productsApiSlice";

const ProductCarousel = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetTopProductsQuery();

  return (
    <div>
      {isLoading ? (
        <ProductCarouselSkeleton />
      ) : isError ? (
        <Alert variant="danger">{error?.data?.error}</Alert>
      ) : (
        <Carousel pause="hover" className="bg-primary mb-4">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  style={{ height: "100%", width: "200px", objectFit: "cover" }}
                />
                <Carousel.Caption className="carousel-caption">
                  <h2 className="text-white text-right">
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductCarousel;

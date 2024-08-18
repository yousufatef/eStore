/* eslint-disable react/prop-types */
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = ({ products }) => {
  return (
    <div>
      {products && products.length > 0 ? (
        <Carousel pause="hover" className="bg-primary mb-4">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h2 className="text-white text-right">
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default ProductCarousel;

import { Alert, Col, Row } from "react-bootstrap";
import Product from "../components/Product/Product";
import ProductCarousel from "../components/Product/ProductCarousel";
import ProductSkeleton from "../components/Product/ProductSkeleton";
import { useGetProductsQuery } from "../redux/api/productsApiSlice";

const HomePage = () => {
  const { data: products, error, isError, isLoading } = useGetProductsQuery();

  return (
    <>
      <ProductCarousel products={products} />
      <h1>Latest Products</h1>
      <Row>
        {isLoading ? (
          <ProductSkeleton products={6} />
        ) : (
          products &&
          products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))
        )}
        {isError && (
          <Alert variant="danger">
            <strong>{error.error}</strong>
          </Alert>
        )}
      </Row>
    </>
  );
};

export default HomePage;

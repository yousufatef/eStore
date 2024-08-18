import { Alert, Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import ProductSkeleton from "../components/ProductSkeleton";
import { useGetProductsQuery } from "../redux/features/productsSlice";

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
          products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))
        )}
        {isError && (
          <Alert variant="danger">
            <strong>Error: {error.message}</strong>
          </Alert>
        )}
      </Row>
    </>
  );
};

export default HomePage;

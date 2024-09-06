import { Alert, Col, Row } from "react-bootstrap";
import Product from "../components/Product/Product";
import ProductCarousel from "../components/Product/ProductCarousel";
import ProductSkeleton from "../components/Product/ProductSkeleton";
import { useGetProductsQuery } from "../redux/api/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, error, isError, isLoading } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      <Meta />
      <h1>Latest Products</h1>
      <Row>
        {isLoading ? (
          <ProductSkeleton products={6} />
        ) : (
          data?.products &&
          data?.products.map((product) => (
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
      <Paginate
        pages={data?.pages}
        page={data?.page}
        keyword={keyword ? keyword : ""}
      />
    </>
  );
};

export default HomePage;

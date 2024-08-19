/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles if needed

const ProductSkeleton = ({ products = 0 }) => {
  return (
    <Row>
      {Array.from({ length: products }).map((_, index) => (
        <Col sm={12} md={6} lg={4} xl={3} key={index} className="mb-4">
          <Skeleton height={130} style={{ borderRadius: "0.25rem" }} />
          <Skeleton height={20} width={100} style={{ margin: "10px 0" }} />
          <Skeleton height={15} width={180} style={{ margin: "10px 0" }} />
          <Skeleton height={15} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductSkeleton;

import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles if needed

const ProductCarouselSkeleton = () => {
  return (
    <Row>
      <Col className="mb-4">
        <Skeleton height={130} style={{ borderRadius: "0.25rem" }} />
      </Col>
    </Row>
  );
};

export default ProductCarouselSkeleton;

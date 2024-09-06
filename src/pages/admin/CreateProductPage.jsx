import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../../redux/api/productsApiSlice";
import { useSelector } from "react-redux";

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [rating] = useState(0);
  const [numReviews] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      user: userInfo._id,
      image,
      brand,
      category,
      description,
      countInStock,
      rating,
      numReviews,
    };


    try {
      await createProduct(productData).unwrap();
      toast.success("Product Created Successfully");
      navigate("/admin/product-list");
    } catch (err) {
      console.error("Error submitting product:", err);
      toast.error(err?.data?.message || err.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // Check file size (10 MB limit)
        toast.error("File size exceeds 10 MB");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result); // This will be a base64 string
      };
    }
  };

  return (
    <>
      <Link to="/admin/product-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {loadingCreate && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control type="file" onChange={uploadFileHandler} />
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateProductPage;

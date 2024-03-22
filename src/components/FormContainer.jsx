import React from "react";
import { Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { insert } from "../db/idb";

const FormContainer = () => {

  const  handleClick = async (event) => {
    event.preventDefault();
 
    const newProduct = {
      name: document.getElementById("productName").value,
      price: document.getElementById("productPrice").value,
      category: document.getElementById("productCategory").value,
      description: document.getElementById("productDescription").value,
    };

    if (
      newProduct.name === "" ||
      newProduct.price === "" ||
      newProduct.category === "Category" ||
      newProduct.description === ""
    ) {
      toast.error("Not all fields are filled");
    } else if(newProduct.price < 0){
      toast.error("Price should be positive");

    }
      else{
        toast.success("Successfully saved!");

      document.getElementById("productName").value = "";
      document.getElementById("productPrice").value = "";
      document.getElementById("productCategory").value = "Category";
      document.getElementById("productDescription").value = "";

      await insert(newProduct)
        .then((message) => {
          console.log(message); // Log success message
        })
        .catch((error) => {
          console.error("Error:", error.message); // Log error message
        });
    }
  };

  return (
    <div>
      <Container className="mt-5 px-5">
        <Form>
          <Row>
            <Col>
              <InputGroup className="mb-4">
                <Form.Control type="text" placeholder="Name" id="productName" />
              </InputGroup>
              <InputGroup className="mb-4">
                <Form.Control
                  type="number"
                  placeholder="Price"
                  id="productPrice"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Select
                  defaultValue="Category"
                  aria-label="Category"
                  id="productCategory"
                >
                  <option disabled>Category</option>
                  <option>Food</option>
                  <option>Health</option>
                  <option>Education</option>
                  <option>Travel</option>
                  <option>Housing</option>
                  <option>Other</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mt-1">
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  rows={6}
                  id="productDescription"
                />
                <Button variant="dark" type="submit" onClick={handleClick}>
                  Submit
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Form>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default FormContainer;

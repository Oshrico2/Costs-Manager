import React, { useState,useEffect } from "react";
import { findAll } from "../db/idb";
import { Container, Table } from "react-bootstrap";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This effect runs only once, on initial render
    findAll()
      .then((data) => {
        console.log("Data retrieved:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // Empty dependency array means this effect runs only once

  return (
    <Container className="mt-5">
      <Table className="text-bg-light" striped bordered hover responsive>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>{product.date}</td>
          </tr>
        ))}
      </Table>
    </Container>
  );
};

export default ProductsTable;

import React, { useState, useEffect } from "react";
import { findAll } from "../db/idb";
import { Container, Table } from "react-bootstrap";

const ProductsTable = (props) => {
  const [products, setProducts] = useState([]);
  const [sumOfExpenses, setSumOfExpenses] = useState(0);
  const [flag, setFlag] = useState(false); 

  useEffect(() => {
    if (!props.data || props.data.length === 0) {
      findAll()
        .then((data) => {
          console.log("Data retrieved:", data);
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Use data from props if it exists
      setProducts(props.data);
      setFlag(true); // Set flag to true
    }
  }, [props.data]); // Run effect whenever props.data changes

  useEffect(() => {
    // Calculate sum of expenses when products change
    const total = products.reduce((acc, product) => acc + parseFloat(product.price), 0);
    setSumOfExpenses(total);
  }, [products]);

  return (
    <Container className="mt-5">
      <Table className="text-bg-light" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody> 
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {flag && <h3 className="text-center text-dark shadow bg-light" style={{ opacity: 0.7 }}>Total expenses for the selected date: {sumOfExpenses}</h3>}
    </Container>
  );
};

export default ProductsTable;

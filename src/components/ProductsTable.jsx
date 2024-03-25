import React, { useState, useEffect } from "react";
import { findAll } from "../db/idb";
import { Container, Table } from "react-bootstrap";

const ProductsTable = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data only if props.data is not provided or is empty
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
    }
  }, [props.data]); // Run effect whenever props.data changes

  return (
    <Container className="mt-5">
      <Table className="text-bg-light" striped bordered hover responsive>
        <thead> {/* Use thead instead of tr for table header */}
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody> {/* Use tbody for table body */}
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
    </Container>
  );
};

export default ProductsTable;

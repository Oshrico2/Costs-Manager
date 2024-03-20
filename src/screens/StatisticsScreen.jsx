import React, { useState } from "react";
import { findAll } from "../db/idb";

const StatisticsScreen = () => {
    const [products,setProducts] = useState([]);

  findAll()
    .then((data) => {
      console.log("Data retrieved:", data);
      setProducts(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });


  return <div>
    {products.map(product => (
        <p>{product.name}</p>
    ))}
  </div>;
};

export default StatisticsScreen;

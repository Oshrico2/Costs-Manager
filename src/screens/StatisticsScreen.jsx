import React, { useState } from "react";
import ProductsTable from "../components/ProductsTable";
import Header from "../components/Header";
import Footer from '../components/Footer';
import Diagram from "../components/Diagram";
import Reports from "../components/Reports";

const StatisticsScreen = () => {

  const [fetchedData, setFetchedData] = useState([]);

  // Function to update fetched data
  const handleDataFetch = (data) => {
    setFetchedData(data);
  };

  return (
    <div className="background2">
      <Header />
      <Reports onDataFetch={handleDataFetch} />
      <ProductsTable data={fetchedData} />
      <Diagram data={fetchedData} />
      <Footer />
    </div>
  );
};

export default StatisticsScreen;
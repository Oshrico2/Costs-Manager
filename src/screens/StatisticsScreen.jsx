import React from "react";
import ProductsTable from "../components/ProductsTable";
import Header from "../components/Header";
import Footer from '../components/Footer';
import Diagram from "../components/Diagram";
import Reports from "../components/Reports";

const StatisticsScreen = () => {
  return (
    <div>
      <Header />
      <Reports />
      <ProductsTable />
      <Diagram />
      <Footer />
    </div>
  );
};

export default StatisticsScreen;

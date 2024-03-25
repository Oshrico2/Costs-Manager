import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { findByCategory } from "../db/idb";

const Diagram = () => {
  const [categories, setCategories] = useState([
    { name: "Food", amount: "" },
    { name: "Health", amount: "" },
    { name: "Education", amount: "" },
    { name: "Travel", amount: "" },
    { name: "Housing", amount: "" },
    { name: "Other", amount: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedCategories = await Promise.all(
          categories.map(async (category) => {
            try {
              const data = await findByCategory(category.name);
              return { ...category, amount: data.length };
            } catch (error) {
              console.error("Error:", error);
              return category;
            }
          })
        );
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [categories]); // Empty dependency array means this effect runs only once

  const customColors = ['#FF204E', '#A0153E', '#5D0E41', '#00224D', '#401F71', '#824D74'];


  return (
    <center>
      <div className="mt-3 diagram-style">
        <PieChart
          series={[
            {
              data: categories.map((category, index) => ({
                id: index,
                value: category.amount,
                label: category.name,
                color: customColors[index]
              })),
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </center>
  );
};

export default Diagram;

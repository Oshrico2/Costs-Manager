import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { findByDate } from "../db/idb";
import exportToExcel from "../utils/exportToExcel";

const Reports = ({ onDataFetch }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchData, setSearchData] = useState(null); // Store fetched data

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear; i++) {
    years.push(i.toString());
  }

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleButtonClick = async () => {
    if (selectedMonth && selectedYear) {
      try {
        const data = await findByDate(selectedMonth, selectedYear);
        console.log(data);
        onDataFetch(data);
        if (data.length !== 0) {
          setSearchData(data); // Store fetched data
          toast.success(
            "Displaying the report according to your request: " +
              months[selectedMonth - 1].label +
              " " +
              selectedYear
          );
        } else {
          toast.warning(
            `There is no data to display on ${
              months[selectedMonth - 1].label
            } ${selectedYear}. Try another date`
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching data.");
      }
    } else {
      toast.error("Please select both month and year.");
    }
  };

  const handleDownloadExcel = () => {
    if (searchData) {
      exportToExcel(searchData, selectedMonth, selectedYear); // Generate Excel file
      toast.success("Download started");
    } else {
      toast.error("No data available to download.");
    }
  };

  return (
    <Container className="mt-4 me-1">
      <ToastContainer />
      <Form>
        <Row>
          <Col md={6} xs={12}>
            <Form.Group controlId="formMonth">
              <Form.Control
                as="select"
                className="mb-2"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Control
                as="select"
                className="mb-2"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6} xs={12} className="text-right">
            <Button
              className="mt-1 btn btn-dark"
              onClick={handleButtonClick}
              style={{ height: "70px", width: "130px" }}
            >
              Search
            </Button>
            {/* Button to download Excel */}
            {searchData && (
              <Button
                className="mt-1 btn btn-success ms-2"
                onClick={handleDownloadExcel}
                style={{ height: "70px", width: "130px" }}
              >
                Excel{" "}
                <svg
                  className="mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                >
                  <path d="M 28.875 0 C 28.855469 0.0078125 28.832031 0.0195313 28.8125 0.03125 L 0.8125 5.34375 C 0.335938 5.433594 -0.0078125 5.855469 0 6.34375 L 0 43.65625 C -0.0078125 44.144531 0.335938 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 29.101563 50.023438 29.402344 49.949219 29.632813 49.761719 C 29.859375 49.574219 29.996094 49.296875 30 49 L 30 44 L 47 44 C 48.09375 44 49 43.09375 49 42 L 49 8 C 49 6.90625 48.09375 6 47 6 L 30 6 L 30 1 C 30.003906 0.710938 29.878906 0.4375 29.664063 0.246094 C 29.449219 0.0546875 29.160156 -0.0351563 28.875 0 Z M 28 2.1875 L 28 6.53125 C 27.867188 6.808594 27.867188 7.128906 28 7.40625 L 28 42.8125 C 27.972656 42.945313 27.972656 43.085938 28 43.21875 L 28 47.8125 L 2 42.84375 L 2 7.15625 Z M 30 8 L 47 8 L 47 42 L 30 42 L 30 37 L 34 37 L 34 35 L 30 35 L 30 29 L 34 29 L 34 27 L 30 27 L 30 22 L 34 22 L 34 20 L 30 20 L 30 15 L 34 15 L 34 13 L 30 13 Z M 36 13 L 36 15 L 44 15 L 44 13 Z M 6.6875 15.6875 L 12.15625 25.03125 L 6.1875 34.375 L 11.1875 34.375 L 14.4375 28.34375 C 14.664063 27.761719 14.8125 27.316406 14.875 27.03125 L 14.90625 27.03125 C 15.035156 27.640625 15.160156 28.054688 15.28125 28.28125 L 18.53125 34.375 L 23.5 34.375 L 17.75 24.9375 L 23.34375 15.6875 L 18.65625 15.6875 L 15.6875 21.21875 C 15.402344 21.941406 15.199219 22.511719 15.09375 22.875 L 15.0625 22.875 C 14.898438 22.265625 14.710938 21.722656 14.5 21.28125 L 11.8125 15.6875 Z M 36 20 L 36 22 L 44 22 L 44 20 Z M 36 27 L 36 29 L 44 29 L 44 27 Z M 36 35 L 36 37 L 44 37 L 44 35 Z"></path>
                </svg>
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Reports;

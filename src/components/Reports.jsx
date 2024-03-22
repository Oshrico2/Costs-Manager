import React, { useState } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Generate months array
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  // Generate years array for the current year and the next 10 years
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

  const handleButtonClick = () => {
    if (selectedMonth && selectedYear) {
      toast.success("Displaying the report according to your request: " + months[selectedMonth - 1].label +  " " + selectedYear);
    } else {
      toast.error('Please select both month and year.');
    }
  };

  return (
    
      <Container className='mt-4 me-1'>
      <ToastContainer />
        <Form>
          <Row>
            <Col xs={6}>
              <Form.Group controlId="formMonth">
                <Form.Control as="select" className='mb-2' value={selectedMonth} onChange={handleMonthChange}>
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formYear">
                <Form.Control as="select" className='mb-2' value={selectedYear} onChange={handleYearChange}>
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              </Col>
            <Col xs={6} className="text-right">
            <Button className='mt-1 btn btn-dark' onClick={handleButtonClick} style={{height:"70px",width:"130px"}} >Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>
  );
};

export default Reports;

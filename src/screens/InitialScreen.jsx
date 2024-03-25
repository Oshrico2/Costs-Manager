import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const InitialScreen = () => {
  return (
    <div className="background">
        <h1 className="animated-text">
          Welcome to Costs Manager!
        </h1>
      <div className="centered">
        <Button as={Link} to="/main" className="floating btn btn-light mb-5 pt-4 shadow">
          <span className="fs-4">Start saving</span>
        </Button>
      </div>
    </div>
  );
};

export default InitialScreen;

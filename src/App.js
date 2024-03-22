import React from "react";
import MainScreen from "./screens/MainScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainScreen />} />
        <Route path="/statistics" element={<StatisticsScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

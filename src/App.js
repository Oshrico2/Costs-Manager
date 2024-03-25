import React from "react";
import './App.css';
import MainScreen from "./screens/MainScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import InitialScreen from './screens/InitialScreen'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<InitialScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/statistics" element={<StatisticsScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

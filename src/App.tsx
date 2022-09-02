import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Navigation from "components/Navigation/Navigation";
import { Button } from "antd";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;

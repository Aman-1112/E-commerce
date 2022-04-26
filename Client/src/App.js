import "./App.css";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <CardList/>
      </Router>
    </div>
  );
}

export default App;

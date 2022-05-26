import {useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./pages/forgotPassword";

function App() {
  const [searchItem, setSearchItem] = useState(null);
  function handleSearch(x){
    setSearchItem(x);
  }
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<CardList/>} />
          <Route exact path="/home" element={<CardList/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

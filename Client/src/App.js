import {useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import SearchList from "./components/SearchList";
import ProductPage from "./components/ProductPage";
import ErrorPage from "./components/ErrorPage.jsx";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

function App() {
  const [searchItem, setSearchItem] = useState(null);
  function handleSearch(x){
    setSearchItem(x);
  }
  return (
    <div>
      <Router>
        <Navbar
          handleSearch={handleSearch}
        />
        <div>
          <Switch>
            <Route exact path="/" component={CardList}></Route>
            <Route exact path="/search/:searchItem" component={SearchList}></Route>
            <Route exact path="/product/:productId" component={ProductPage}></Route>
            <Route component={ErrorPage}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

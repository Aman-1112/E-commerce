import "./App.css"
import Navbar from "./components/Navbar";
import Errorpage from "./components/Errorpage";
import ProductList from "./components/ProductList";
import SearchList from "./components/SearchList";
import ProductPage from "./components/ProductPage";
import CreateProduct from "./components/Temporary/CreateProduct";
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={ProductList}></Route>
          <Route exact path="/search/:searchItem" component={SearchList}></Route>
          <Route exact path="/product/:productId" component={ProductPage}></Route>
          <Route exact path="/createproduct" component={CreateProduct}></Route>
          <Route component={Errorpage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

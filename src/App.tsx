import PrimaryAppBar from "./Components/Appbar/PrimaryAppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StockBase from "./Components/StockPage/StockBase";
import AboutBase from "./Components/About/AboutBase";
import { getSearchedStock } from "./app/hooks";

function App() {
  let searchedStock = getSearchedStock();
  console.log(searchedStock);

  return (
    <div className="App">
      <PrimaryAppBar name="nishit" />
      {searchedStock && <StockBase />}
      {/* <Router>
        <Switch>
          <Route path="/home">
            <div style={{fontSize: "24px", padding: "1rem"}}>
              Home
            </div>
          </Route>
          <Route path="/stock">
            <div style={{fontSize: "24px", padding: "1rem"}}>
              <StockBase />
            </div>
          </Route>
          <Route path="/about">
            <AboutBase />
            </Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;

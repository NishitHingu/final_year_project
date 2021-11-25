import PrimaryAppBar from "./Components/Appbar/PrimaryAppBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import StockBase from "./Components/StockPage/StockBase";
import AboutBase from "./Components/About/AboutBase";

function App() {

  return (
    <div className="App">
      <Router>
        <PrimaryAppBar name="nishit"/>
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
      </Router>
    </div>
  );
}

export default App;

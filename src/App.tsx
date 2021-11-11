import PrimaryAppBar from "./Components/Appbar/PrimaryAppBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { Typography } from "@material-ui/core";

function App() {
  const searchStockList = useAppSelector(state => state.autocompleteSearchBar.searchedStocks);


  return (
    <div className="App">
      <Router>
        <PrimaryAppBar name="nishit"/>
        <Switch>
          <Route path="/home">
            <div style={{fontSize: "24px", padding: "1rem"}}>
              Home
              {searchStockList.map(item => (
                <Typography variant="h5" key={item}>
                  {item}
                </Typography>
              ))}
            </div>
          </Route>
          <Route path="/stock">
            <div style={{fontSize: "24px", padding: "1rem"}}>
              Stock
            </div>
          </Route>
          <Route path="/about">
            <div style={{fontSize: "24px", padding: "1rem"}}>
              About
            </div></Route>  
        </Switch>
      </Router>
    </div>
  );
}

export default App;

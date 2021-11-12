import PrimaryAppBar from "./Components/Appbar/PrimaryAppBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { Typography } from "@material-ui/core";

function App() {
  const searchedStock = useAppSelector(state => state.autocompleteSearchBar.searchedStock);


  return (
    <div className="App">
      <Router>
        <PrimaryAppBar name="nishit"/>
        <Switch>
          <Route path="/home">
            <div style={{fontSize: "24px", padding: "1rem"}}>
              Home
                <Typography variant="h5">
                  {searchedStock}
                </Typography>
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

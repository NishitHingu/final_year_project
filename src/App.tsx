import PrimaryAppBar from "./Components/Appbar/PrimaryAppBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Typography } from "@mui/material";
import Base from "./Components/StockPage/Base";

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
              <Base />
            </div>
          </Route>
          <Route path="/about">
            <div style={{fontSize: "24px", padding: "1rem"}}>
            <Typography variant="h3" align="center" style={{paddingTop: "34"}}>
              Financial Market Analysis Platform
            </Typography>  
            </div></Route>  
        </Switch>
      </Router>
    </div>
  );
}

export default App;

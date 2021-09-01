import PrimaryAppBar from "./Components/Appbar/PrimaryAppBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <PrimaryAppBar />
        <Route path="/home"></Route>
        <Route path="/stock"></Route>
        <Route path="/about"></Route>  
      </Router>
    </div>
  );
}

export default App;

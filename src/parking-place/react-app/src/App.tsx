import Home from "./components/Home";
import "./App.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;

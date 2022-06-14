import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import News from "./News";
import Blog from "./Blog";
import Exercise from "./Exercise";
import Diet from "./Diet";
import Login from "./Loginpage/Login";

function App() {
  return (
    <div className="App h-auto bg-[#202124]">
      <switch>
        <Route exact path="/" component={News} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/exercise" component={Exercise} />
        <Route exact path="/diet" component={Diet} />
      </switch>
    </div>
  );
}

export default App;

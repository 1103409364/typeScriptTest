import { HashRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import HomePage from "./Pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;

import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Home } from './Pages/Home';
import Poll from './Pages/Poll';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path = "/" component={Home} />
        <Route exact path = "/:id" component={Poll} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;

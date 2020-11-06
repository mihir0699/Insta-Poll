import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Home } from './Pages/Home';
import Poll from './Pages/Poll';
import Not_found from './Pages/Not_found';
import Footer from './Pages/Footer';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path = "/" component={Home} />
        <Route exact path="/not_found" component={Not_found} />
        <Route exact path = "/:id" component={Poll} />
      
        <Route path="*" exact={true} component={Not_found} />
      </Switch>
      <Footer />
    </Router>
    </div>
  );
}

export default App;

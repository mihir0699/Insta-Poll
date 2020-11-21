import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Home } from './Pages/Home';
import Poll from './Pages/Poll';
import Not_found from './Pages/Not_found';
import Footer from './Pages/Footer';
import Auth from './Pages/Auth';
import UserProvider from './firebase/UserProvider';
import PrivateRoute from './Pages/PrivateRoute';


function App() {
  return (
    <div className="App">
       <UserProvider>
    <Router>
      <Switch>
        <PrivateRoute exact path = "/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/not_found" component={Not_found} />
        <PrivateRoute exact path = "/:id" component={Poll} />
     
        <Route path="*" exact={true} component={Not_found} />
      </Switch>
      <Footer />
    </Router>
    </UserProvider>
    </div>
  );
}


export default App;

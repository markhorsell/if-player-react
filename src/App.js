import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './containers/Home';
import About from './containers/About';
import './App.css';

const App = props => (
  <Router>
    <div>
      <ul className='nav'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      
    </div>
  </Router>
);


export default App;

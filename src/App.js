import React, { Component }  from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './containers/Home';
import About from './containers/About';
import { connect } from 'react-redux';
import './App.css';
import data from './assets/theshivers/data.json';

import {
  initData,
  

} from './actions'

class App extends Component {

  constructor(props) {

    super(props)

  }
componentWillMount(){
  
  console.log(data);
  //TODO add this data to the state
  this.props.dispatch(initData(data))
      


}

  render() {
    return (
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
  }
}

App.propTypes = {
};

function mapStateToProps(state) {
  //has testObj and happens before 13
  console.log(state);
  //{testObj:{testvalue:'x'}}
  const { testObj } = state;
  return {
    testObj,
  }
}


export default connect(mapStateToProps)(App);

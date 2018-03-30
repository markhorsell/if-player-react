import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';

import data from './assets/theshivers/data.json';

import Nav from './components/Nav';
import Home from './containers/Home';
import About from './containers/About';



import {
    initData,
} from './actions'

class App extends Component {

  /*
    constructor(props) {
        super(props)

    }
    */
    componentDidMount() {
        //Inital state
        //Could do a fetch here if..
        //.. i want to put the json on the server
        //..but for now just import it

        this.props.dispatch(initData(data))
    }

    render() {
        return ( 
           
           <Router>
             
             <div>
              <Nav/>
              <div className='main'>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              </div>
            </div>
          </Router>
        );
    }
}

App.propTypes = {};

export default connect()(App);
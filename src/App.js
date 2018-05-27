import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect,  Switch} from "react-router-dom";
import { connect } from 'react-redux';


//import data from './assets/theshivers/data.json';

import Nav from './components/Nav';
import Header from './components/Header';
import Home from './containers/Home';
import About from './containers/About';





import {
   // initData,
   restart,
} from './actions'

class App extends Component {

  /*
    constructor(props) {
        super(props)

    }
    */
    componentDidMount() {
        //Inital state
        //TODO if redux-persist has data then i shouldnt need to call restart..
        //.. a new action such as resume();

       if(this.props.gameTitle){
          //Alreay has gameTitle so must have come from persist
          console.log('GameTitle');
       }else{
        this.props.dispatch(restart());
       }
       
   
    }

    render() {
      const {gameTitle } = this.props;
      if(gameTitle){
      }else{
        return <div>NOT READY</div>
      }
        return ( 
           
           <Router>
             
             <div className='main'>
             
             
            
              <Nav/>
              <Header title={gameTitle}/>
              <Switch>
              <Route exact path="/shivers-react/game" component={Home} />
              <Route exact path="/shivers-react/about" component={About} />
              <Redirect from="/shivers-react/" to="/shivers-react/game" />
              </Switch>
            
            </div>
          </Router>
        );
    }
}

App.propTypes = {};
/*
export default connect()(App);
*/
function mapStateToProps(state) {

 
 
  const {gameTitle } =state.gameData;
  return {
    gameTitle,
   

  }
}
export default connect(mapStateToProps)(App)
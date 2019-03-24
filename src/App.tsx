import React, { Component } from "react";


import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";


//import data from './assets/theshivers/data.json';

import Header from "./components/Header";
import Home from "./pages/Game";
import About from "./pages/About";
import Todo from "./pages/Todo";

import {
  // initData,
  restart
} from "./actions";

interface IProps {
  gameTitle: string;
  dispatch: Function;
  //propTypes: any;
}

class App extends Component<IProps> {
 
  /*
    constructor(props) {
        super(props)

    }
    */
  componentDidMount() {
    //Inital state

    //TODO if redux-persist has data then i shouldnt need to call restart..
    //.. a new action such as resume();

    if (this.props.gameTitle) {
      //Alreay has gameTitle so must have come from persist
      console.log("game data from cache");
    } else {
      this.props.dispatch(restart());
    }
  }

  render() {
    const { gameTitle } = this.props;
    if (gameTitle) {
    } else {
      return <div>NOT READY</div>;
    }
    return (
      <Router>
        <div>
          <Header title={gameTitle} />
          <Switch>
            <Route exact path="/shivers-react/game" component={Home} />
            <Route exact path="/shivers-react/about" component={About} />
            <Route exact path="/shivers-react/todo" component={Todo} />
            <Redirect from="/shivers-react/" to="/shivers-react/game" />
            <Redirect from="/" to="/shivers-react/game" />
          </Switch>
        </div>
      </Router>
    );
  }
}

/*
export default connect()(App);
*/
function mapStateToProps(state: any) {
  const { gameTitle } = state.gameData;
  return {
    gameTitle
  };
}
export default connect(mapStateToProps)(App);

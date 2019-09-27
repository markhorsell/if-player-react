import React, { useEffect } from "react";

import { GlobalStyles, theme } from "./theme";
import /*styled,*/ { ThemeProvider } from "styled-components/macro";


import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";


//import data from './assets/theshivers/data.json';

import Header from "./components/Header";
import Game from "./pages/Game";
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

//class App extends Component<IProps> {

  const App: React.SFC<IProps> = ({gameTitle}) => {
 
  const dispatch = useDispatch()
  useEffect(()=>{
    if (gameTitle) {
      //Alreay has gameTitle so must have come from persist
      //console.log("game data from cache");
    } else {
      console.log("HOOKS DISPATCH")
      dispatch(restart());
    }

  });


  return(

  
      <ThemeProvider theme={theme}>
      <>
      <GlobalStyles/>
      <Router>
        <div>
          {gameTitle &&
          <>
          <Header title={gameTitle} />
          <Switch>
            <Route exact path="/shivers-react/game" component={Game} />
            <Route exact path="/shivers-react/about" component={About} />
            <Route exact path="/shivers-react/todo" component={Todo} />
            <Redirect from="/shivers-react/" to="/shivers-react/game" />
            <Redirect from="/" to="/shivers-react/game" />
          </Switch>
          </>
          }
          {!gameTitle &&
            <div>Not Loaded...</div>
          }
          
        </div>
      </Router>
      </>
      </ThemeProvider>
    );
  }

function mapStateToProps(state: any) {
  const { gameTitle } = state.gameData;
  return {
    gameTitle
  };
}
export default connect(mapStateToProps)(App);

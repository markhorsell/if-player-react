import React, { useEffect } from "react";

import { GlobalStyles, theme } from "./theme";
import /*styled,*/ { ThemeProvider } from "styled-components/macro";


import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


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
  //gameTitle: string;
  //dispatch: Function;
  //propTypes: any;
}

//class App extends Component<IProps> {

  const App: React.SFC<IProps> = () => {
 
  const dispatch = useDispatch()
  const gameTitle = useSelector((state:any) => state.gameData.gameTitle);
  useEffect(()=>{
    if (gameTitle) {
      //Alreay has gameTitle so must have come from persist
      //console.log("game data from cache");
    } else {
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
            <Route path="/game" component={Game} />
            <Route path="/about" component={About} />
            <Route path="/todo" component={Todo} />
            <Redirect from="/" to="/game" />
            
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


export default App;

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

import Header from "./components/Header";
import Game from "./pages/Game";
import About from "./pages/About";
import Todo from "./pages/Todo";

import {
  restart
} from "./actions";

import {IState } from "./types"

interface IProps {

}




//class App extends Component<IProps> {

const App: React.SFC<IProps> = () => {

  const dispatch = useDispatch()
  const gameTitle = useSelector((state: IState) => state.gameData.gameTitle);
  useEffect(() => {
    if (gameTitle) {
      //Alreay has gameTitle so must have come from persist
      //console.log("game data from cache");
    } else {
      dispatch(restart());
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <div>
            {gameTitle &&
              <>
                <Header title={gameTitle} />
                <Switch>
                  <Route path={`${process.env.PUBLIC_URL}/game`} component={Game} />
                  <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
                  <Route path={`${process.env.PUBLIC_URL}/todo`} component={Todo} />
                  <Redirect from={`${process.env.PUBLIC_URL}/`} to={`${process.env.PUBLIC_URL}/game`} />
                  <Redirect from={`/`} to={`${process.env.PUBLIC_URL}/game`} />
                  {`${process.env.PUBLIC_URL}/about`}
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

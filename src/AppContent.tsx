import React, { useEffect } from "react";


import {
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

import { IState } from "./types"

interface IProps {

}


const AppContent: React.SFC<IProps> = () => {
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
      <main>
        {gameTitle &&
          <>
            <Header title={gameTitle} />
            <Switch>
              <Route path={`/game`} component={Game} />
              <Route path={`/about`} component={About} />
              <Route path={`/todo`} component={Todo} />
              <Redirect from={`/`} to={`/game`} />
           
          
            </Switch>
          </>
        }
        {!gameTitle &&
          <div>Not Loaded...</div>
        }
      </main>
    )
  }


export default AppContent;

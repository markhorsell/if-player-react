import React, { useEffect } from "react";


import {
  Route,
  Redirect,
  Switch,
  useParams,
  useLocation,
  useHistory
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

  //let { slug } = useParams()
  let location = useLocation()
  //let history = useHistory()
  // console.log(slug)
  console.log(process.env.PUBLIC_URL);
  console.log(location.pathname)
  //console.log(history)
  const dispatch = useDispatch()
  const gameTitle = useSelector((state: IState) => state.gameData.gameTitle);

  useEffect(() => {
    if (gameTitle) {
      //Alreay has gameTitle so must have come from persist
      //console.log("game data from cache");
    } else {
      dispatch(restart());
    }
  }, []);

  if(!gameTitle){
    return <main><div>Not Loaded...</div></main>
  }
    

  return (
    <main>
          <Header title={gameTitle} />
          <Switch>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            <Route path={`${process.env.PUBLIC_URL}/game`} component={Game} />
            <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
            <Route path={`${process.env.PUBLIC_URL}/todo`} component={Todo} />
           
            <Redirect from={`${process.env.PUBLIC_URL}/`} to={`${process.env.PUBLIC_URL}/game`} />

          </Switch>
    </main>
  )
}


export default AppContent;

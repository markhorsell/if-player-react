import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";

import { ActionButton } from "../styled-constants";
import { restart } from "../actions";

import {
  useParams,
  useLocation,
  useHistory
} from "react-router-dom";

import { IState } from "../types"

const PageDiv = styled.div`
  max-width: 600px;
  margin: 70px auto 0px auto;
  padding: 10px;
  > p {
    line-height: 20px;
    margin-block-start: 1px;
    margin-block-end: 3px;
  }
`;

const About: FunctionComponent = () => {

  const { slug } = useParams()
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch();
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const move: number = useSelector((state: IState) => state.gameData.move);

  //const debugState:any = useSelector((state: IState) => state.gameData);
  //console.log(debugState)

  useEffect(() => {
    const updateWindowDimensions = () => {

      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    updateWindowDimensions();

    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    }
  }, [])


  const handleRestart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(restart())

  };


  return (
    <React.StrictMode>
      <PageDiv>
        <div style={{ background: "#333", padding: "10px", borderRadius: "4px" }}>
          <h2>Game Engine For Interactive Fiction</h2>
          <p>By Mark Horsell</p>
        </div>
        <br />
        <div style={{ background: "#333", padding: "10px", borderRadius: "4px" }}>
          <h3>Version 2.1.1 : 27 September 2019</h3>
          <p>Redux connect replaced with useDispatch and useSelector Hooks.</p>
          <br />
          <h3>Version 2.1.0 : 25 September 2019</h3>
          <p>Now uses 100% Functional Components with Hooks - All Classes and Lifecycle methods removed.</p>
          <br />
          <h3>Version 2.0.0 : 24 March 2019</h3>
          <p>Converted from JavaScript to TypeScript and from Inline-CSS to Styled-components.</p>
          <br />
          <h3>Version 1.0.3 : May 2018</h3>
          <p>Class Based, Inline-CSS, React Router, Redux.</p>
        </div>
        <br />
        <div style={{ background: "#333", padding: "10px", borderRadius: "4px" }}>
          <h3>Debug Info</h3>
          <p>URL : {window.location.href}</p>
          <p>PUBLIC_URL : {process.env.PUBLIC_URL}</p>
          <p>
            W : {width} | H : {height}
          </p>
          <p>React Version : {React.version} </p>
          <p>slug : {slug} </p>
          <p>location : {JSON.stringify(location)} </p>
          <p>history : {JSON.stringify(history)} </p>
        </div>

        <br />

        <div style={{ background: "#333", padding: "10px", borderRadius: "4px" }}>
          <p>
            WARNING : Perfoming a reset will clear all data and is not undoable.
          </p>
          <ActionButton disabled={move < 1} onClick={handleRestart}>Reset game</ActionButton>
          {move === 0 &&
            <p>You haven't left the starting room yet</p>}
        </div>
      </PageDiv>
    </React.StrictMode>
  );
}




export default About;

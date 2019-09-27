import React, { useEffect } from "react";
import {  useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { ActionButton } from "../styled-constants";
import { restart } from "../actions";

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

interface IProps {
  dispatch: Function;
}
interface IState {
  width: number;
  height: number;
}

const About: React.FC = () => {

  const dispatch = useDispatch();
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);



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


  const handleRestart = (e: any) => {
    e.preventDefault();
    dispatch(restart())

  };


  return (
    <React.StrictMode>
      <PageDiv>
      <div style={{ background: "#333", padding:"10px" , borderRadius:"4px"}}>
        <h2>Game Engine For Interactive Fiction</h2>
        <p>By Mark Horsell</p>
        </div>
        <br />
        <div style={{ background: "#333", padding:"10px" , borderRadius:"4px"}}>
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
        <div style={{ background: "#333",padding:"10px" , borderRadius:"4px" }}>
          <h3>Debug Info</h3>
          <p>URL : {window.location.href}</p>
          <p>PUBLIC_URL : {process.env.PUBLIC_URL}</p>
          <p>
            W : {width} | H : {height}
          </p>
          <p>React Version : {React.version} </p>
        </div>
        <br />
        {/*
      <p>An editor is available here ------</p>
      <p>Strict mode wraps Home and About - Wrapping App will create warnings as either Provider or Router Libraries are not Strict as yet</p>
  */}

<div style={{ background: "#333",padding:"10px" , borderRadius:"4px" }}>
        <p>
          WARNING : RESETTING GAME WILL CLEAR ALL DATA AND IS NOT UNDOABLE
          </p>
        <ActionButton onClick={handleRestart}>Reset game</ActionButton>
        </div>
      </PageDiv>
    </React.StrictMode>
  );
}




export default About;

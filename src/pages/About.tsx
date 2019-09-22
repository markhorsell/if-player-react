import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";

import { ActionButton } from "../styled-constants";
import { restart } from "../actions";

const PageDiv = styled.div`
  max-width: 600px;
  margin: 70px auto 0px auto;
  padding: 10px;
  > p {
    line-height: 18px;
  }
`;

interface IProps {
  dispatch: Function;
}
interface IState {
  width: number;
  height: number;
}

const About: React.FC = (data: any) => {

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const updateWindowDimensions = () => {

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {

    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    }
  }, [])


  const handleRestart = (e: any) => {
    e.preventDefault();
    data.dispatch(restart())
  
  };


  return (
    <React.StrictMode>
      <PageDiv>
        <p>A game engine for Interactive fiction.</p>
        <p>A React / Redux application.</p>
        <p>By Mark Horsell</p>

        <p>Version 1.0.3 : May 2018</p>

        <p>Version 2.0.0 : 24 March 2019</p>
        <p>Converted JS to TypeScript and CSS to Styled-components</p>

        <p>{window.location.href}</p>
        <p>
          W:{width} | H:{height}
        </p>
        <p>React Version : {React.version} </p>
        {/*
      <p>An editor is available here ------</p>
      <p>Strict mode wraps Home and About - Wrapping App will create warnings as either Provider or Router Libraries are not Strict as yet</p>
  */}


        <p>
          WARNING : RESETTING GAME WILL CLEAR ALL DATA AND IS NOT UNDOABLE
          </p>
        <ActionButton onClick={handleRestart}>Reset game</ActionButton>
      </PageDiv>
    </React.StrictMode>
  );
}


//export default About;

export default connect()(About);

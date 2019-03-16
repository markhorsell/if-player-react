import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { restart } from "../actions";

const PageDiv = styled.div`
  max-width: 600px;

  margin: 70px auto 0px auto;
  padding: 10px;
  > P {
    line-height:8px;
  }
`;
const ActionsDiv = styled.div`
  display: inline-block;
  vertical-align: top;
  >Button {
	display:inline-block;
	/*trbl*/
	padding:3px 6px 3px 6px;
	margin:10px;
	border: none;
	border-radius:2px;
	background-color:gold;
	font-weight:bold;
	font-size:inherit;
	letter-spacing: inherit;
	color:black;
	cursor:pointer;
  }
`;

interface IProps {
  dispatch:Function;
}
interface IState {
  width:number;
  height:number;
}

class About extends Component<IProps,IState> {
  constructor(props:IProps) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  restart = (e:any) => {
    e.preventDefault();

    this.props.dispatch(restart());
  };

  render() {
    const windowWidth = this.state.width;
    const windowHeight = this.state.height;
    return (
      <React.StrictMode>
        <PageDiv>
          <p>A game engine for Interactive fiction.</p>
          <p>A React / Redux application.</p>
          <p>By Mark Horsell</p>
          <br/>
          <p>Version 1.0.3 May 2018</p>
          <br/>
          <p>Version 2 March 2018</p>
          <p>Converted JS to TypeScript and CSS to Styled-components</p>
          <p>Added forest and Dice Rolling</p>
          <br />
          <p>{window.location.href}</p>
          <p>
            W:{windowWidth} | H:{windowHeight}
          </p>
          <p>React Version : {React.version} </p>
          {/*
      <p>An editor is available here ------</p>
      <p>Strict mode wraps Home and About - Wrapping App will create warnings as either Provider or Router Libraries are not Strict as yet</p>
  */}
          <ActionsDiv>
            <br />
            <br />
            <br />
            <br />
            <p>
              WARNING : RESETTING GAME WILL CLEAR ALL DATA AND IS NOT UNDOABLE
            </p>
            <button onClick={this.restart}>Reset game</button>
          </ActionsDiv>
        </PageDiv>
      </React.StrictMode>
    );
  }
}

//export default About;

export default connect()(About);

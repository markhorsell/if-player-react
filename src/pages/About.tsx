import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import theme from "../theme";
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

class About extends Component<IProps, IState> {
  constructor(props: IProps) {
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

  restart = (e: any) => {
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
       
          <p>Version 1.0.3 : May 2018</p>
    
          <p>Version 2.0.0 : 24 March 2018</p>
          <p>Converted JS to TypeScript and CSS to Styled-components</p>
  
          <p>{window.location.href}</p>
          <p>
            W:{windowWidth} | H:{windowHeight}
          </p>
          <p>React Version : {React.version} </p>
          {/*
      <p>An editor is available here ------</p>
      <p>Strict mode wraps Home and About - Wrapping App will create warnings as either Provider or Router Libraries are not Strict as yet</p>
  */}

          
          <p>
            WARNING : RESETTING GAME WILL CLEAR ALL DATA AND IS NOT UNDOABLE
          </p>
          <ActionButton onClick={this.restart}>Reset game</ActionButton>
        </PageDiv>
      </React.StrictMode>
    );
  }
}

//export default About;

export default connect()(About);

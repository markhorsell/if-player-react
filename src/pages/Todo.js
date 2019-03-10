import React, { Component } from "react";
import { connect } from "react-redux";
import styled  from "styled-components"

const DoneP=styled.p`
  text-decoration: line-through;
`;


class Todo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div style={{ marginTop: "80px" }}>
      <p>The carver now makes a dice from the bone</p>
       <p>Once rolled a 6 the monster shows you an exit so you can find the mouthpiece</p>
        <DoneP>Add styled-components</DoneP>
        <p>Remove css and convert to styled-c</p>
        <p>Fix the styling - make iphone 5 compatible</p>
        <DoneP>Add Typescripy</DoneP>
        <p>Fully convert to typescript</p>
        <DoneP>Fix map connection rendering</DoneP>
        <DoneP>Update to lastest packages</DoneP>
        <p>Add Dice roll option to fight monster</p>
        <p>Add typein option for puzzles or riddle answers</p>
        <p>Add Health Meter</p>
        <p>
          could eating posioned mushrooms cause confusion so that directions
          appear as Worth, Sest, Eouth, Nest and go in random directions
        </p>
        <p>bump up to version 2.0</p>
      </div>
    );
  }
}

export default connect()(Todo);

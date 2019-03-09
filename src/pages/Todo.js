import React, { Component } from "react";
import { connect } from "react-redux";



class Todo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div style={{ marginTop: "80px" }}>
        <p>Add styled-components</p>
        <p>Fix the styling - make iphone 5 compatible</p>
        <p>Fix map connection rendering</p>
        <p style={{textDecoration: 'line-through'}}>Update to lastest packages</p>
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

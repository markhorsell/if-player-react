
import React, { Component } from "react";
import { connect } from 'react-redux';

class Home extends Component {

  constructor(props) {

    super(props)
  }

  render() {
    const { gameData } = this.props;

    return (
      <div>
        <h2>{gameData.gameTitle}</h2>
        <p>This will hold the component and component trees for the game</p>
        <p>TODO build header component</p>
        <p>TODO build room description component</p>
        <p>TODO build message component</p>
        <p>TODO build inventory component</p>
        <p>TODO build map component</p>
        <p>TODO build commands commponent</p>
        
      </div>
    )
  }
}

Home.propTypes = {
};

function mapStateToProps(state) {
  //has testObj and happens before 13
  console.log(state);
 
  const { gameData } = state;
  return {
    gameData,


  }
}
export default connect(mapStateToProps)(Home)
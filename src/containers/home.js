
import React, { Component } from "react";
import { connect } from 'react-redux';
import RoomDescription from '../components/RoomDescription';

import './Home.css';

class Home extends Component {

  constructor(props) {

    super(props)
  }
  getDescription(roomData){
    return roomData.desc;
  }
  getRoomData(roomId,rooms){
    const roomData = rooms.filter(room => room.id===roomId)[0];
    return roomData; 
  }

  render() {
    const { gameData } = this.props;
    const currentRoomData = this.getRoomData(gameData.room,gameData.rooms);
    const description = this.getDescription(currentRoomData);

    return (
      <div className='home'>
        <h2>{gameData.gameTitle}</h2>
        <p>This will hold the component and component trees for the game</p>
        <p>TODO build header component</p>
        <p>TODO build room description component</p>
        <RoomDescription description={description}/>
        <p>TODO Put the images in the image folder</p>
        <p>TODO Should image be a subcomponent of RoomDescription or should i put it on this level?</p>
        <p>TODO build message component</p>
        <p>TODO build inventory component</p>
        <p>TODO build map component</p>
        <p>TODO build commands component SHOULD BE THE ONLY Thing that needs to be a class and which dispatches to redux</p>
        
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
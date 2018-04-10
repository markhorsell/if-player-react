
import React, { Component } from "react";
import { connect } from 'react-redux';


import Header from '../components/Header';
import RoomDescription from '../components/RoomDescription';
import RoomImage from '../components/RoomImage';
import Message from '../components/Message';
import LocationObjects from '../components/LocationObjects';
import Inventory from '../components/Inventory';
import Actions from '../components/Actions';
import WorldMap from '../components/WorldMap';
//import Debug from '../components/Debug';

//import './Home.css';

import { getRoomData,
  getInventory,
  //getAllowedActions,
  //getAllowedExits,
  getLocationObjects 
 } from '../utils/dataHelper';

/*
The project was built assuming it is hosted at the server root.
You can control this with the homepage field in your package.json.
For example, add this to build it for GitHub Pages:

  "homepage" : "http://myname.github.io/myapp",
*/
//npm run build
//yarn global add serve
//yarn - s serve
//http://localhost:5000


class Home extends Component {
  /*
  constructor(props) {
    super(props)
  }
  */
  getDescription(roomData){
    return roomData.desc[0];
  }
  getImage(roomData){
    return roomData.image;
  }
  
  

  render() {
    
    const {discoveredPaths, gameData } = this.props;
    
    
    //Dont Allow rendering if data is empty as will break
    if(Object.keys(gameData).length === 0) {
      return <p>NOT LOADED</p>

    }
    const rooms = gameData.rooms;
    const roomId = gameData.room;
    const objects = gameData.objects;
    const message =gameData.lastMessage;
 
    const currentRoomData = getRoomData(roomId,rooms);
    const description = this.getDescription(currentRoomData);
    const locationObjects = getLocationObjects(roomId,objects);
    const image = this.getImage(currentRoomData);
    const inventory = getInventory(objects);
    
    

    //TODO assets folder will be switchable later
    const assetsFolder='theshivers';

    //stateless functional component where possible
    //
    return (
     
      <div>
        
        
        <Header title={gameData.gameTitle}/>
  <div style={{height:'80vh'}}>
        <p>TODO https://popmotion.io/pose/</p>
        
        <p>{'process.env.PUBLIC_URL = '+process.env.PUBLIC_URL}</p>
        <p>Room = {roomId}</p>
        
        <RoomImage path ={'/assets/'+assetsFolder+'/images/'} image={image}/>
        <RoomDescription description={description}/>
        <Message message={message}/>
        <LocationObjects items={locationObjects}/>
        <Inventory items={inventory}/>
      
        <Actions/>
      </div>
      <div style={{textAlign:'center', padding:'20px', backgroundColor:'red'}}> &darr; SCROLL FOR MAP </div>
       
        <WorldMap discoveredPaths={discoveredPaths} room={roomId} rooms={rooms}/>
      
        {/*<Debug data={gameData}/>*/}
        
      </div>
    
    
    )
  }
}

Home.propTypes = {
};

function mapStateToProps(state) {

 
  const { gameData } = state;
  const {discoveredPaths } =state.gameData;
  return {
    gameData,
    discoveredPaths


  }
}
export default connect(mapStateToProps)(Home)
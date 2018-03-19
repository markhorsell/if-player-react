
import React, { Component } from "react";
import { connect } from 'react-redux';


import Header from '../components/Header';
import RoomDescription from '../components/RoomDescription';
import RoomImage from '../components/RoomImage';
import LocationObjects from '../components/LocationObjects';
import Inventory from '../components/Inventory';
import Actions from '../components/Actions';
import WorldMap from '../components/WorldMap';
import Debug from '../components/Debug';

import './Home.css';

import { getRoomData,
  getInventory,
  getAllowedActions,
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
    
    const { gameData } = this.props;

    //Dont Allow rendering if data is empty as will break
    if(Object.keys(gameData).length === 0) {
      return <p>NOT LOADED</p>

    }
    const rooms = gameData.rooms;
    const room = gameData.room;
    const objects = gameData.objects;
    const actions = gameData.actions;
    const money = gameData.money;
    const currentRoomData = getRoomData(room,rooms);
    const description = this.getDescription(currentRoomData);
    const locationObjects = getLocationObjects(room,objects);
    const image = this.getImage(currentRoomData);
    const inventory = getInventory(objects);
    const allowableActions = getAllowedActions(objects,actions,room,money);

    //TODO assets folder will be switchable later
    const assetsFolder='theshivers';

    //stateless functional component where possible
    //
    return (
      <div className='home'>
        
        
        <Header title={gameData.gameTitle}/>
        
        <p>{'process.env.PUBLIC_URL = '+process.env.PUBLIC_URL}</p>
        <p>Room = {room}</p>
        <RoomImage path ={'/assets/'+assetsFolder+'/images/'} image={image}/>
        <RoomDescription description={description}/>
        <LocationObjects items={locationObjects}/>
        
      
        <p>TODO build message component</p>
        
        <Inventory items={inventory}/>
        <Actions allowableActions={allowableActions}/>
        <WorldMap discoveredPaths={[]}/>
        

        {/*<Debug data={gameData}/>*/}
        
      </div>
    )
  }
}

Home.propTypes = {
};

function mapStateToProps(state) {
  //has testObj and happens before 13
  console.log(state.gameData);
 
  const { gameData } = state;
  return {
    gameData,


  }
}
export default connect(mapStateToProps)(Home)
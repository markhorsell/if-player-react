
import React, { Component } from "react";
import { connect } from 'react-redux';


import Header from '../components/Header';
import RoomDescription from '../components/RoomDescription';
import RoomImage from '../components/RoomImage';
import Inventory from '../components/Inventory';
import Actions from '../components/Actions';
import WorldMap from '../components/WorldMap';
import Debug from '../components/Debug';

import './Home.css';

import { getRoomData,getInventory,getAllowedActions  } from '../utils/dataHelper';

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
    return roomData.desc;
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
    const image = this.getImage(currentRoomData);
    const inventory = getInventory(objects);
    const allowedActions = getAllowedActions(objects,actions,room,money);
    console.log(allowedActions);

    //TODO assets folder will be switchable later
    const assetsFolder='theshivers';


    return (
      <div className='home'>
        
        
        <Header title={gameData.gameTitle}/>
        
        <p>{'process.env.PUBLIC_URL = '+process.env.PUBLIC_URL}</p>
        <RoomImage path ={'/assets/'+assetsFolder+'/images/'} image={image}/>
        <RoomDescription description={description}/>
        <p>TODO items in this location</p>
        
      
        <p>TODO build message component</p>
        
        <Inventory items={inventory}/>
        <Actions allowableActions={allowedActions}/>
        <WorldMap discoveredPaths={'this will be a discovered paths list'}/>
        

        <Debug data={gameData}/>
        
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
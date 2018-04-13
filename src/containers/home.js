
import React, { Component } from "react";
import { connect } from 'react-redux';



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

  getDescription(roomData){
    return roomData.desc[0];
  }
  getImage(roomData){
    return roomData.image;
  }
  

  render() {
    
    const {money,discoveredPaths, rooms, gameData,room,objects,message } = this.props;
    
    //Dont Allow rendering if data is empty as will break
    if(rooms.length === 0) {
      return <p>NOT LOADED</p>

    }

 
    const currentRoomData = getRoomData(room,rooms);
    const description = this.getDescription(currentRoomData);
    const locationObjects = getLocationObjects(room,objects);
    const image = this.getImage(currentRoomData);
    const inventory = getInventory(objects);
    
    //TODO assets folder will be switchable later
    const assetsFolder='theshivers';

  
    return (
     
      <div className='home'>
        
        
       

       {/*} <p>TODO https://popmotion.io/pose/</p>
      
        <p>{'process.env.PUBLIC_URL = '+process.env.PUBLIC_URL}</p>
        <p>Room = {roomId}</p>
    */}
        <RoomImage path ={'/assets/'+assetsFolder+'/images/'} image={image}/>
        <RoomDescription description={description}/>
        <Message message={message}/>
        <LocationObjects items={locationObjects}/>
        <Inventory items={inventory} money={money}/>
      
        <Actions/>
     
     
        <WorldMap discoveredPaths={discoveredPaths} room={room} rooms={rooms}/>
        
      </div>
    
    
    )
  }
}

Home.propTypes = {
};

function mapStateToProps(state) {

  const {discoveredPaths, money,rooms,room,objects,message  } =state.gameData;
  return {
    discoveredPaths, money,rooms,room,objects,message,
  }
}
export default connect(mapStateToProps)(Home)
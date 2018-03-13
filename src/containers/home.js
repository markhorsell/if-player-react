
import React, { Component } from "react";
import { connect } from 'react-redux';

import RoomDescription from '../components/RoomDescription';
import RoomImage from '../components/RoomImage';
import Debug from '../components/Debug';

import './Home.css';

import { getRoomData } from '../utils/dataHelper';

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
    console.log(process.env.PUBLIC_URL);
    const { gameData } = this.props;
    const currentRoomData = getRoomData(gameData.room,gameData.rooms);
    const description = this.getDescription(currentRoomData);
    const image = this.getImage(currentRoomData);
    //TODO assets folder will be switchable later
    const assetsFolder='theshivers';


    return (
      <div className='home'>
        <h2>{gameData.gameTitle}</h2>
        
        <p>TODO build header component</p>
        
        <p>{'process.env.PUBLIC_URL = '+process.env.PUBLIC_URL+'🤡'}</p>
        <RoomImage path ={'/assets/'+assetsFolder+'/images/'} image={image}/>
        <RoomDescription description={description}/>
        
      
        <p>TODO build message component</p>
        <p>TODO build inventory component</p>
        <p>TODO build map component</p>
        <p>TODO build commands component SHOULD BE THE ONLY Thing that needs to be a class and which dispatches to redux</p>

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
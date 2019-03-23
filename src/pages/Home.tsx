import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import RoomDescription from "../components/RoomDescription";
import RoomImage from "../components/RoomImage";
import Message from "../components/Message";
import LocationObjects from "../components/LocationObjects";
import Inventory from "../components/Inventory";
import Actions from "../components/GameActions";
import WorldMap from "../components/WorldMap";
//import Debug from '../components/Debug';

//import './Home.css';

import {
  getRoomData,
  getInventory,
  //getAllowedActions,
  //getAllowedExits,
  getLocationObjects
} from "../utils/dataHelper";

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

const HomeDiv = styled.div`
  max-width: 600px;

  margin: 70px auto 0px auto;
  @media only screen and (min-width: 600px) {
    /* wider */
  }
`;
const TextPanelDiv = styled.div`
  display: inline-block;

 
 
  max-width: 600px;
  @media only screen and (min-width: 600px) {
    /* wider */
    max-width: 400px;
  }
`;
const MapContainerDiv = styled.div`
  display: inline-block;
  
  width: 26%;
  
  vertical-align:top;
  /*max-width: 120px;*/
  /*margin:3px 0px 0px 0px;*/
 
  /*
  > div {
    margin: 10px auto 0px auto;
   
  }*/

  @media only screen and (min-width: 600px) {
    /* wider */
    >div {
  
  
    }
  }
`;
const ImageContainerDiv=styled.div`
 display: inline-block;
  width:72%;
`

interface IProps {
  money: any;
  discoveredPaths: any;
  rooms: any;
  room: any;
  objects: any;
  lastMessage: any;
  roll: any;
}

class Home extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  getDescription(roomData: any) {
    if (roomData && roomData.desc && roomData.desc.length) {
      return roomData.desc[0];
    } else {
      console.log("NO roomData desc for " + roomData);
    }
  }
  getImage(roomData: any) {
    if (roomData && roomData.image) {
      return roomData.image;
    } else {
      console.log("NO roomData image for " + roomData);
    }
  }

  render() {
    const {
      money,
      discoveredPaths,
      rooms,
      room,
      objects,
      lastMessage,
      roll
    } = this.props;
    //Dont Allow rendering if data is empty
    if (rooms.length === 0) {
      return <p>NOT LOADED</p>;
    }
    const currentRoomData = getRoomData(room, rooms);
    const description = this.getDescription(currentRoomData);
    const locationObjects = getLocationObjects(room, objects);
    const image = this.getImage(currentRoomData);
    const inventory = getInventory(objects);

    //TODO assets folder will be switchable later
    const assetsFolder = "theshivers";

    const isLocal = window.location.href.substr(7, 9) === "localhost";

    return (
      <HomeDiv>
        
       <ImageContainerDiv>
        {isLocal ? (
          <RoomImage
            path={"../assets/" + assetsFolder + "/images/"}
            image={image}
          />
        ) : (
          <RoomImage
            path={"/shivers-react/assets/" + assetsFolder + "/images/"}
            image={image}
          />
        )}
        </ImageContainerDiv>
        
        <MapContainerDiv>
          <div>
            <WorldMap
              discoveredPaths={discoveredPaths}
              room={room}
              rooms={rooms}
            />
          </div>
        </MapContainerDiv>
       
        <Actions />
        <TextPanelDiv>
       
        
       
          <Message message={lastMessage} />

          <RoomDescription description={description} />

          <LocationObjects items={locationObjects} />
          <Inventory items={inventory} money={money} />

         
        </TextPanelDiv>
      
      </HomeDiv>
    );
  }
}



function mapStateToProps(state:any) {
  const {
    discoveredPaths,
    money,
    rooms,
    room,
    objects,
    lastMessage,
    roll
  } = state.gameData;
  return {
    discoveredPaths,
    money,
    rooms,
    room,
    objects,
    lastMessage,
    roll
  };
}
export default connect(mapStateToProps)(Home);

import React, { } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import RoomDescription from "../components/RoomDescription";
import RoomImage from "../components/RoomImage";
import Message from "../components/Message";
import LocationObjects from "../components/LocationObjects";
import Inventory from "../components/Inventory";
import Actions from "../components/GameActions";
import ExploreActions from "../components/ExploreActions";
import WorldMap from "../components/WorldMap";
import Debug from '../components/Debug';
import { IState, IRoomData, IItem } from "../types";



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
`;
const MapContainerDiv = styled.div`
  display: inline-block;
  width: calc(100% - 150px);
  /*width:120px;*/
  vertical-align:top;

  @media only screen and (min-width: 600px) {
    /* wider */
    >div {
  
    }
  }
`;
const ImageContainerDiv = styled.div`
 display: inline-block;
  /*width:72%;*/
  width:100%;
`

interface IRouter {
  history:any;
  location:any;
  match:any;
}


const Game: React.FC<IRouter> = ({}) => {
  
  //console.log(history, location)

  const objects: Array<IItem> = useSelector((state: IState) => state.gameData.objects);
  const roomID: number | string = useSelector((state: IState) => state.gameData.room);
  const money: number = useSelector((state: IState) => state.gameData.money);
  const rooms: Array<IRoomData> = useSelector((state: IState) => state.gameData.rooms);
  const discoveredPaths: any = useSelector((state: IState) => state.gameData.discoveredPaths);
  const lastMessage: string = useSelector((state: IState) => state.gameData.lastMessage);


  const getDescription = (roomData: any) => {
    if (roomData && roomData.desc && roomData.desc.length) {
      return roomData.desc[0];
    } else {
      console.log("NO roomData desc for " + roomData);
    }
  }
  const getImage = (roomData: any) => {
    if (roomData && roomData.image) {
      return roomData.image;
    } else {
      console.log("NO roomData image for " + roomData);
    }
  }


  //Dont Allow rendering if data is empty
  if (rooms.length === 0) {
    return <p>NOT LOADED</p>;
  }
  const currentRoomData = getRoomData(roomID, rooms);
  const description = getDescription(currentRoomData);
  const locationObjects = getLocationObjects(roomID, objects);
  const image = getImage(currentRoomData);
  const inventory = getInventory(objects);

  //TODO assets folder will be switchable later
  const assetsFolder = "theshivers";

  //TODO - I shouldnt need to worry about local paths? Is webpack misconfigured?
  //const isLocal = window.location.href.substr(7, 9) === "localhost";



  return (
    <HomeDiv>

      <ImageContainerDiv>
       
        <RoomImage
          path={process.env.PUBLIC_URL + "/assets/" + assetsFolder + "/images/"}
          image={image}
        />
      </ImageContainerDiv>


      <div style={{ display: 'inline-block', width: "150px" }}>
        <ExploreActions />
      </div>
    
      <MapContainerDiv>
        <div style={{ textAlign: "right" }}>
          <WorldMap
            discoveredPaths={discoveredPaths}
            roomID={roomID}
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
    {/*<Debug debug={JSON.stringify(objects)} />*/}

    </HomeDiv>
  );

}

export default Game;

import React, { useEffect, useState } from "react";

import { debounce } from "lodash";

import styled from "styled-components/macro";

const isLocal = window.location.href.substr(7, 9) === "localhost";

let WorldMapDiv: any;

if (isLocal) {
  WorldMapDiv = styled.div`
    > canvas {
      border-radius: 10px;
      display: inline;
      background-image: url("../assets/theshivers/images/game_bg.jpg");
    }
  `;
} else {
  WorldMapDiv = styled.div`
  > canvas {
    border-radius: 10px;
    display: inline;
   
    /*background-image: url("/shivers-react/assets/theshivers/images/game_bg.jpg");*/
    background-image: url("https://raw.githubusercontent.com/markhorsell/if-player-react/gh-pages/assets/theshivers/images/game_bg.jpg");
  }
`;

}


interface IProps {
  room: any;
  rooms: Array<any>;
  discoveredPaths: Array<any>;
}
interface IState { };



const WorldMap: React.SFC<IProps> = ({ room, rooms, discoveredPaths }) => {

  const canvasRef = React.createRef<any>();

  const mapContainerRef = React.createRef<any>();
//todo should now be useRefs

  const [mapWidth, setMapWidth] = useState(0)

  useEffect(() => {
    updateCanvasDebounce()
    window.addEventListener("resize", updateCanvasDebounce);
    return () => {
      window.removeEventListener("resize", updateCanvasDebounce);
    }
  });


  const updateCanvasDebounce = debounce(() => {
    if (!mapContainerRef.current) {
      //TODO why is mapContainerRef sometimes missing?
      return;
    }
  
    setMapWidth(Math.max(Math.min(mapContainerRef.current.offsetWidth,200),100));
  }, 40);


  useEffect(() => {
    console.log("useEffect width")
    const updateCanvasCalc = () => {
   
      const currentRoom = room;

     

      const ctx = canvasRef.current.getContext("2d");

      const visitedRooms = rooms.filter((room: any) => {
        if (discoveredPaths.includes(room.id)) {
          return true;//room;
        } else {
          return false;
        }
      });
      //console.log(visitedRooms);
      canvasRef.current.width = mapWidth;
      canvasRef.current.height = mapWidth;

      //Only worry about rooms with numbers
      //Named rooms are not supposed to be mapped

      const spacing = mapWidth / 5;
      const middle = spacing / 2;
      const allGrids = new Array(10);
      for (var i = 0; i < 10; i++) {
        allGrids[i] = new Array(10);
      }
      //Cutout circle
      ctx.fillStyle = "#000000";


      ctx.fillRect(0, 0, mapWidth, mapWidth);
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();

      //Swap out if i want to revert to a circular map
      //ctx.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2, true);
      ctx.fillRect(0, 0, mapWidth, mapWidth);

      ctx.fill();

      ctx.restore();

      ctx.strokeStyle = "#333";

      ctx.setLineDash([1, 5]);
      //
      //REFACTOR - SHOULD BE FOR OF NOT MAP
      //
      visitedRooms.map(room => {
        const grid = parseInt(room.id, 10);
        if (grid > 10) {
          const x = Math.floor(grid / 10) * spacing + middle;
          const y = (grid % 10) * spacing + middle;
          //REFACTOR - SHOULD BE FOR OF NOT MAP
          Object.values(room.exits).map((exit: any) => {
            const exitVal = parseInt(exit, 10);
            if (exitVal > 10) {
              const xE = Math.floor(exitVal / 10) * spacing + middle;
              const yE = (exitVal % 10) * spacing + middle;
              ctx.moveTo(x / 2, y / 2);
              ctx.lineTo(xE / 2, yE / 2);
              ctx.stroke();
            }
            return exit;
          });
        }
        return room;
      });
      if (currentRoom > 10) {
        //Player
        const x = Math.floor(currentRoom / 10) * spacing + middle;
        const y = (currentRoom % 10) * spacing + middle;
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 0, 0, 0)";
        ctx.arc(x / 2, y / 2, spacing / 6, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 0, 0, 1)";
        ctx.stroke();
        ctx.fill();
        ctx.restore();
      }
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          const visited =
            visitedRooms.filter(room => {
              return parseInt(room.id) === x * 10 + y;
            }).length === 1;
          if (!visited) {
            ctx.save();
            ctx.shadowBlur = 30;
            ctx.shadowColor = "black";
            ctx.fillStyle = "rgba(0, 0, 0,0.1)";
            ctx.fillRect(
              ((x - 1) * spacing) / 2 - spacing / 4 + spacing / 2 + middle / 2,
              (y * spacing) / 2 - spacing / 4 + middle / 2,
              spacing / 2,
              spacing / 2
            );
            ctx.restore();
          }
        }
      }
    };
    updateCanvasCalc();
  }, [mapWidth]);



  return (

    <WorldMapDiv ref={mapContainerRef}>
      <canvas ref={canvasRef} />
    </WorldMapDiv>
  );

}


export default WorldMap;

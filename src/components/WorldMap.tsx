import React, { Component } from "react";
import PropTypes from "prop-types";

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
}else{
  WorldMapDiv = styled.div`
  > canvas {
    border-radius: 10px;
    display: inline;
    background-image: url("/shivers-react/assets/theshivers/images/game_bg.jpg");
  }
`;

}

//TODO debounce could be in utils
/*
type Props = {
  description:string
  room:object;
}
*/
interface IProps {
  room: any;
  rooms: Array<any>;
  discoveredPaths: Array<any>;
}
interface IState {}

class WorldMap extends Component<IProps, IState> {
  private canvasRef = React.createRef<any>();
  private mapContainerRef = React.createRef<any>();

  constructor(props: IProps) {
    super(props);

    this.updateCanvas = this.debounce(this.updateCanvas, 100, false);
  }

  componentDidMount() {
    this.updateCanvas();
    window.addEventListener("resize", this.updateCanvas.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateCanvas.bind(this));
  }
  debounce = (func: Function, wait: number, immediate: boolean) => {
    console.log(this);
    const _this = this;
    var timeout: any;
    return function() {
      var context: any = _this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  updateCanvas = () => {
    if (!this.mapContainerRef.current) {
      return;
    }
    console.log("update canvas");
    const currentRoom = this.props.room;

    const width = Math.min(this.mapContainerRef.current.offsetWidth, 250);
    //const width =this.mapContainerRef.current.offsetWidth;
    this.mapContainerRef.current.height = width;

    const ctx = this.canvasRef.current.getContext("2d");

    const visitedRooms = this.props.rooms.filter(room => {
      if (this.props.discoveredPaths.includes(room.id)) {
        return room;
      }
    });
    console.log(visitedRooms);
    this.canvasRef.current.width = width;
    this.canvasRef.current.height = width;

    //Only worry about rooms with numbers
    //Named rooms are not supposed to be mapped

    const spacing = width / 5;
    const middle = spacing / 2;
    const allGrids = new Array(10);
    for (var i = 0; i < 10; i++) {
      allGrids[i] = new Array(10);
    }
    //Cutout circle
    ctx.fillStyle = "#000000";
   
 
    ctx.fillRect(0, 0, width, width);
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    
    //Swap out if i want to revert to a circular map
    //ctx.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2, true);
    ctx.fillRect(0,0,width,width);
   
    ctx.fill();
   
    ctx.restore();

    ctx.strokeStyle = "#333";
  
    ctx.setLineDash([1, 5]);
    visitedRooms.map(room => {
      const grid = parseInt(room.id, 10);
      if (grid > 10) {
        const x = Math.floor(grid / 10) * spacing + middle;
        const y = (grid % 10) * spacing + middle;
        Object.values(room.exits).map((exit: any) => {
          const exitVal = parseInt(exit, 10);
          if (exitVal > 10) {
            const xE = Math.floor(exitVal / 10) * spacing + middle;
            const yE = (exitVal % 10) * spacing + middle;
            ctx.moveTo(x / 2, y / 2);
            ctx.lineTo(xE / 2, yE / 2);
            ctx.stroke();
          }
        });
      }
      //--
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
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
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
  render() {
    this.updateCanvas();

    return (
      <WorldMapDiv ref={this.mapContainerRef}>
        <canvas ref={this.canvasRef} />
      </WorldMapDiv>
    );
  }
}

export default WorldMap;

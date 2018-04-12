import React, { Component } from 'react';
import PropTypes from 'prop-types';

//TODO debounce could be in utils
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
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

class WorldMap extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.mapContainerRef = React.createRef();
        this.updateCanvas = debounce(this.updateCanvas,100);
    }

    componentDidMount() {
        this.updateCanvas();
        window.addEventListener("resize", this.updateCanvas.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateCanvas.bind(this));
    }
   
    updateCanvas() {
        //TODO debounce
        if (!this.mapContainerRef.current) {
            return;
        }

        const width = this.mapContainerRef.current.offsetWidth;
        this.mapContainerRef.current.height = width;
        const ctx = this.canvasRef.current.getContext('2d');
       
        this.canvasRef.current.width = width;
        this.canvasRef.current.height = width;
       
        //If a room has been visited add it
        //Only worry about rooms with numbers
        //Named rooms are not supposed to be maps
        //Room xy or yx?
        const spacing = width / 10;

        const visitedGrids = this.props.discoveredPaths.map((room) => {
            const grid = parseInt(room, 10);
            if (grid > 10) {
                const x = Math.floor(grid / 10);
                const y = grid % 10;
                return { x: x, y: y };
            }
            return null;
        }).filter((grid) => {
            return grid !== null;
        });
        const roomGrid = parseInt(this.props.room, 10);
        visitedGrids.forEach(grid => {
            //const exits =
            this.props.rooms.map(room => {
                if (room.id === grid.x.toString() + grid.y.toString()) {

                    for (var key in room.exits) {

                        const exitgrid = parseInt(room.exits[key], 10);
                        if (exitgrid > 10) {
                            const x = Math.floor(exitgrid / 10);
                            const y = exitgrid % 10;

                            ctx.beginPath();
                            ctx.moveTo(grid.x * spacing, grid.y * spacing);
                            ctx.lineTo(x * spacing, y * spacing);
                            ctx.stroke();
                        }
                    }
                }
            })
        }
        );
        /*
        visitedGrids.forEach(grid => {
            ctx.beginPath();
            ctx.arc(grid.x * spacing, grid.y * spacing, spacing / 5, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.fill();
        })*/
        if (roomGrid > 10) {
            const x = Math.floor(roomGrid / 10);
            const y = roomGrid % 10;
            ctx.beginPath();
            ctx.arc(x * spacing, y * spacing, spacing / 8, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
            ctx.fill();
        }
        //XYR,XYR
        var grad = ctx.createRadialGradient(50, 50, 50, 50, 50, 0);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.33, "rgba(0,0,0,1)");	// extra point to control "fall-off"
        grad.addColorStop(1, "black");

        ctx.fillStyle = grad;
        ctx.filter = "blur(8px)";

      /*
       
        for(var x=-1;x<11;x++){
         
            for(var y=-1;y<11;y++){
                
               // if(xGrids.indexOf(x)!==-1 || yGrids.indexOf(y)!==-1){
               const visited=visitedGrids.filter(grid=>{
                  // console.log(grid.x , x , grid.y ,y)
                   if(grid.x == x && grid.y ==y){
                       //console.log('xxx')
                       
                       return true;
                   }
                   return false;
               })
               
               if(!visited.length){
                   //90
                    ctx.fillRect((x-0.7)*spacing, (y-0.7)*spacing, 90, 90);
               }
                
               // }
            }
        }*/




    }
    render() {
        this.updateCanvas();

        return (
            <div className='worldmap' ref={this.mapContainerRef}>
                <canvas ref={this.canvasRef} ></canvas>
            </div>
        )
    }
}
WorldMap.propTypes = {
    discoveredPaths: PropTypes.array.isRequired,
    room: PropTypes.string.isRequired,
    rooms: PropTypes.array.isRequired,
}


export default WorldMap;
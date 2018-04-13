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
        const currentRoom = this.props.room;

        const width = Math.min(this.mapContainerRef.current.offsetWidth,200);
        //const width =this.mapContainerRef.current.offsetWidth;
        this.mapContainerRef.current.height = width;
       
        const ctx = this.canvasRef.current.getContext('2d');
       
        this.canvasRef.current.width = width;
        this.canvasRef.current.height = width;
       
   
        //Only worry about rooms with numbers
        //Named rooms are not supposed to be mapped
       
        const spacing = width / 10;
        const allGrids= new Array(10);
        for (var i = 0; i < 10; i++) {
            allGrids[i] = new Array(10);
        }
        for (const room of this.props.discoveredPaths) {
            const grid = parseInt(room, 10);
            if (grid > 10) {
                const x = Math.floor(grid / 10);
                const y = grid % 10;
                allGrids[x][y]='VISITED';
            }
          }
        

        for(var x=0;x<10;x++){
            for(var y=0;y<10;y++){
                //console.log(allGrids[x][y]);
                if(allGrids[x][y]==='VISITED'){
                    ctx.strokeStyle="#000000";
                    //NOTE IF I DONT WANT AJACENT VISITED ROOMS TO ALWAYS BE ACCESIBLE..
                    //..I COULD ADD AN EXIT CHECK AS WELL
                    if(allGrids[x-1][y]==='VISITED'){ 
                        ctx.beginPath();
                        ctx.moveTo((x * spacing)+(spacing/2), (y * spacing)+(spacing/2));
                        ctx.lineTo(((x-1) * spacing)+(spacing/2), (y * spacing)+(spacing/2));
                        ctx.stroke();
                    }
                    if(allGrids[x][y+1]==='VISITED'){
                        ctx.beginPath();
                        ctx.moveTo((x * spacing)+(spacing/2), (y * spacing)+(spacing/2));
                        ctx.lineTo((x * spacing)+(spacing/2), ((y+1) * spacing)+(spacing/2));
                        ctx.stroke();
                    }

                }else{
                    ctx.save();
                    ctx.shadowBlur=30;
                    ctx.shadowColor="black";
                    ctx.fillStyle = 'rgba(0, 0, 0,0.1)';
                    ctx.fillRect(x*spacing, y*spacing, spacing, spacing);
                    ctx.restore();    
                }
            }
        }
        if (currentRoom > 10) { 
            const x = Math.floor(currentRoom / 10);
            const y = currentRoom % 10;
            ctx.beginPath();
            ctx.arc(x * spacing+(spacing/2), y * spacing+(spacing/2), spacing / 8, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
            ctx.fill();
        } 
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
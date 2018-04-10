import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WorldMap extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.mapContainerRef = React.createRef();
    }

    componentDidMount() {
        this.updateCanvas();
        window.addEventListener("resize", this.updateCanvas.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateCanvas.bind(this));
    }
    updateCanvas() {
        if (!this.mapContainerRef.current) {
            return;
        }
        console.log('DISCOVERED PATHS');
        console.log(this.props.discoveredPaths)
        const width = this.mapContainerRef.current.offsetWidth;
        this.mapContainerRef.current.height = width;
        const ctx = this.canvasRef.current.getContext('2d');
        //Keep as a square so use width for both
        this.canvasRef.current.width = width;
        this.canvasRef.current.height = width;

        ctx.beginPath();
        ctx.arc(width / 2, width / 2, (width / 2) - 20, 0, 2 * Math.PI);

        ctx.fillStyle = "rgba(99, 255, 99, 0.3)";
        ctx.fill();
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
            const exits = this.props.rooms.map(room => {
                if (room.id === grid.x.toString() + grid.y.toString()) {
                    console.log('Room has been discovered ' + room.id);
                    //console.log(room.exits);
                    // room.exits.
                    for (var key in room.exits) {
                        console.log(room.exits[key]);
                        const exitgrid = parseInt(room.exits[key], 10);
                        if (exitgrid > 10) {
                            const x = Math.floor(exitgrid / 10);
                            const y = exitgrid % 10;
                            console.log(x, y);
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
        visitedGrids.forEach(grid => {
            ctx.beginPath();
            ctx.arc(grid.x * spacing, grid.y * spacing, spacing / 5, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.fill();

       
        })

        if (roomGrid > 10) {
            const x = Math.floor(roomGrid / 10);
            const y = roomGrid % 10;
            ctx.beginPath();
            ctx.arc(x * spacing, y * spacing, spacing / 8, 0, 2 * Math.PI);
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
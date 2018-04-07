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
        //console.log(this.props.discoveredPaths)
        const width = this.mapContainerRef.current.offsetWidth;
        this.mapContainerRef.current.height = width;
        const ctx = this.canvasRef.current.getContext('2d');
        //Keep as a square so use width for both
        this.canvasRef.current.width = width;
        this.canvasRef.current.height = width;
        
        ctx.beginPath();
        ctx.arc(width / 2, width / 2, (width / 2)-20, 0, 2 * Math.PI);
      
        ctx.fillStyle ="rgba(99, 255, 99, 0.3)";
        ctx.fill();
        
    }
    render() {
        return (
            <div className='worldmap' ref={this.mapContainerRef}>
                <canvas ref={this.canvasRef} ></canvas>
            </div>
        )
    }
}
WorldMap.propTypes = {
    discoveredPaths: PropTypes.array.isRequired,
}


export default WorldMap;
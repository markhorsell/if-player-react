import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WorldMap extends Component{
	
	  constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.mapContainerRef = React.createRef();
  }
  
  componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
    	console.log(this.props.discoveredPaths)
        const width=this.mapContainerRef.current.offsetWidth;
        this.mapContainerRef.current.height=width;
        const ctx = this.canvasRef.current.getContext('2d');
        console.log(width, 'square');
       
        console.log(ctx);
        //Keep as a square so use width for both
        this.canvasRef.current.width=width;
        this.canvasRef.current.height=width;
        ctx.fillStyle='lightgreen';
        ctx.fillRect(0,0, width, width);
        
        ctx.beginPath();
        ctx.arc(width/2,width/2,width/2,0,2*Math.PI);
        ctx.stroke();
    }
render(){
	return (
        <div ref={this.mapContainerRef}>
		<canvas ref={this.canvasRef} ></canvas>
        </div>
    )
}	
}
WorldMap.propTypes = {
	discoveredPaths: PropTypes.array.isRequired,
}


export default WorldMap;
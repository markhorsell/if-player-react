import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WorldMap extends Component{
	/*
	  constructor(props) {
    	super(props)
  }
  */
  componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
    	console.log(this.props.discoveredPaths)
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle='lightgreen';
        ctx.fillRect(0,0, 150, 75);
    }
render(){
	return (
		<canvas ref="canvas" width='150px' height='75px'></canvas>
		)
	}	
}
WorldMap.propTypes = {
	discoveredPaths: PropTypes.array.isRequired,
}


export default WorldMap;
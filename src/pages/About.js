
import React, {Component}  from "react";
import { connect } from 'react-redux';

import {
	restart,
} from '../actions';

class About extends Component{
	
  constructor(props) {
      super(props);
      this.state = { width: 0, height: 0 };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
	
  restart= () => (e) => {
    e.preventDefault();
    console.log('restart')
    this.props.dispatch(restart());
  }

render(){
  const windowWidth=this.state.width;
  const windowHeight=this.state.height;
  return(
  
  <React.StrictMode>
    <div  className='about'>
     
      <p>A game engine for Interactive fiction.</p>
      <p>A React / Redux application.</p>
      <p>By Mark Horsell</p>
      <p>Version 1.0.3</p>
      <p>May 2018</p>
      <br/>
      <p>{window.location.href}</p>
      <p>W:{windowWidth} | H:{windowHeight}</p>
      <p>React Version : {React.version} </p>
  {/*
      <p>An editor is available here ------</p>
      <p>Strict mode wraps Home and About - Wrapping App will create warnings as either Provider or Router Libraries are not Strict as yet</p>
  */}
  <div className="actions">
  <br/>
  <br/>
  <br/>
  <br/>
  <p>WARNING : RESETTING GAME WILL CLEAR ALL DATA AND IS NOT UNDOABLE</p>
  <button  onClick={this.restart()}>Reset game</button>

  
  </div>
    </div>
    </React.StrictMode>
    )
  }
}

  //export default About;

  export default connect()(About)
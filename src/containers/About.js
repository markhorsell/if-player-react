
import React, {Component}  from "react";

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

render(){
  const windowWidth=this.state.width;
  const windowHeight=this.state.height;
  return(
  
  <React.StrictMode>
    <div  className='about' ref={this.divRef}>
      <h2>About</h2>
      <p>A game engine for Interactive fiction</p>
      <p>An editor is available here ------</p>
      <p>W:{windowWidth} | H:{windowHeight}</p>
      <p>React Version : {React.version} </p>
      <p>Strict mode wraps Home and About - Wrapping App will create warnings as either Provider or Router Libraries are not Strict as yet</p>
      <p>{React.About}</p>
    </div>
    </React.StrictMode>
    )
  }
}

  export default About;
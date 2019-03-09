
import React, {Component}  from "react";
import { connect } from 'react-redux';

import {
	restart,
} from '../actions';

class Todo extends Component{
	
  constructor(props) {
      super(props);
    
}

componentDidMount() {

  }
  componentWillUnmount() {
 
  }
  
render(){

 
  return(
  
 
    <div style={{marginTop:'80px'}}>
     
      <p>Add styled-components</p>
      <p>Update to lastest packages</p>
      <p>Add Dice roll option to fight monster</p>
      <p>Add typein option for puzzles or riddle answers</p>
      <p>Add Health Meter</p>
      <p>could eating posioned mushrooms cause confusion so that directions appear as Worth, Sest, Eouth, Nest and go in random directions</p>
      <p>May 2018</p>
   
  
  
  
  </div>
 
    )
  }
}


  export default connect()(Todo)
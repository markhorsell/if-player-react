import React, {Component} from 'react';




class Actions extends Component{
	
	  constructor(props) {
    	super(props)
  }
  
  componentDidMount() {
        
    }
    

render(){
	let allowableActions = this.props.allowableActions.map(action =>{
		return action.action;
	})
	return (
		<p>{allowableActions}</p>
		)
	}	
}

export default Actions;
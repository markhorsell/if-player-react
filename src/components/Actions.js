import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Actions extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
	}
	render() {
		let allowableExits = this.props.allowableExits.map(exit=>{
			if(exit==='n') return 'North';
			if(exit==='e') return 'East';
			if(exit==='s') return 'South';
			if(exit==='w') return 'West';
			if(exit==='u') return 'Up';
			if(exit==='d') return 'DOwn';
			
		})
		let allowableActions = this.props.allowableActions.map(action => {
			return action.action;
		})
		return (
			<Fragment>
			<p>{allowableExits}</p>
			<p>{allowableActions}</p>
			</Fragment>
		)
	}
}
Actions.propTypes = {
	allowableActions: PropTypes.array.isRequired,
}

export default Actions;
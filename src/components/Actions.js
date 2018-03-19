import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Actions extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
	}
	render() {
		let allowableActions = this.props.allowableActions.map(action => {
			return action.action;
		})
		return (
			<p>{allowableActions}</p>
		)
	}
}
Actions.propTypes = {
	allowableActions: PropTypes.array.isRequired,
}

export default Actions;
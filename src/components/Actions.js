import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



import {
	getRoomData,
	getAllowedActions,
	getAllowedExits,
} from '../utils/dataHelper';

import {
	resultMessage,
	resultScore,

} from '../actions'



class Actions extends Component {

	constructor(props) {
		super(props);
		this.handleAction = this.handleAction.bind(this);
	}

	componentDidMount() {
	}
	handleAction = (action) => (e) => {
		e.preventDefault();
		//console.clear();
		const { gameData } = this.props;
		const actions = gameData.actions;
		console.log('if action was available then it must be valid - but i could double check? maybe i might need to do if game is restored from a saved');
		const results = actions.filter(a => {
			return a.action === action
		})[0].results;

		//this.props.dispatch(doAction(results));

		console.log('TODO dispath actions for each result');
		for (var key of Object.keys(results)) {

			this.dispatchResults(key, results[key])

		}

	}
	dispatchResults(key, data) {
		console.log(key + ": " + data);
		switch (key) {
			case 'message':
			this.props.dispatch(resultMessage(data));
				break;
			case 'take':
				console.log('TODO dispatch take  ' + data);
				break;
			case 'changeScore':
				console.log('TODO dispatch changescore ' + data);
				//TODO USE mapDispatchToProps
				this.props.dispatch(resultScore(data));
				break;
			default:
				console.log('WARNING result = [' + key + '] is not being processed!');
		}
	}

	render() {
		const { gameData } = this.props;
		const rooms = gameData.rooms;
		const roomId = gameData.room;
		const objects = gameData.objects;
		const actions = gameData.actions;
		const money = gameData.money;
		const currentRoomData = getRoomData(roomId, rooms);
		const allowableExits = getAllowedExits(currentRoomData).map(exit => {
			if (exit === 'n') return 'North';
			if (exit === 'e') return 'East';
			if (exit === 's') return 'South';
			if (exit === 'w') return 'West';
			if (exit === 'u') return 'Up';
			if (exit === 'd') return 'Down';
			return null;
		});
		const allowableActions = getAllowedActions(objects, actions, roomId, money).map(action => {
			return action.action;
		});



		return (
			<Fragment>
				<div className='actions'>
					{allowableExits.length > 0 &&
						allowableExits.map((exit, index) => {
							return <button key={index}>{exit}</button>
						})
					}

					{allowableActions.length > 0 &&
						allowableActions.map((action, index) => {
							return (<button key={index} onClick={this.handleAction(action)}>
								{action}
							</button>)
						})
					}
				</div>
			</Fragment>
		)
	}
}
Actions.propTypes = {
	//allowableActions: PropTypes.array.isRequired,
	//allowableExits: PropTypes.array.isRequired,
}



function mapStateToProps(state) {
	//has testObj and happens before 13


	const { gameData } = state;
	return {
		gameData,


	}
}
//mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may cause change of application state)
export default connect(mapStateToProps)(Actions)
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



import {
	getRoomData,
	//getInventory,
	getAllowedActions,
	getAllowedExits,
	//getLocationObjects
} from '../utils/dataHelper';



class Actions extends Component {

	constructor(props) {
		super(props);
		this.handleAction = this.handleAction.bind(this);
	}

	componentDidMount() {
	}
	handleAction = (action) => (e) => {
		e.preventDefault();
		console.clear();
		const { gameData } = this.props;
		const actions = gameData.actions;
		console.log('if action was available then it must be valid - but i could double check? maybe i might need to do if game is restored from a saved');
		const results=actions.filter(a =>{
			return a.action===action	
		})[0].results;
		console.log(results);
		console.log('Those results now need to be parsed and then the state needs to be updated');
		console.log('TODO - this needs to make an action dispatch ');
		
		console.log('So retreive action results and update state');

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
export default connect(mapStateToProps)(Actions)
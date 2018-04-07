import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import initdata from '../assets/theshivers/data.json';



import {
	getRoomData,
	getAllowedActions,
	getAllowedExits,
} from '../utils/dataHelper';

import {
	resultMessage,
	resultScore,
	resultTake,
	resultDrop,
	resultLocation,
	resultDestroy,
	resultMoney,
	resultRoomDesc,
	resultCreateExit,
	initData,
	

} from '../actions'



class Actions extends Component {

	constructor(props) {
		super(props);
		this.handleAction = this.handleAction.bind(this);
		this.handleMove = this.handleMove.bind(this);
	}

	componentDidMount() {
	}
	handleMove = (exit) => (e) => {
		const rooms = this.props.gameData.rooms;
		const roomId = this.props.gameData.room;
		const currentRoomExits = getRoomData(roomId, rooms).exits;
		e.preventDefault();
		switch (exit) {
			case 'Up':
				this.props.dispatch(resultLocation(currentRoomExits.u));
				this.props.dispatch(resultMessage('You\'ve travelled Up'));
				break;
			case 'Down':
				this.props.dispatch(resultLocation(currentRoomExits.d));
				this.props.dispatch(resultMessage('You\'ve travelled Down'));
				break;
			case 'North':
				this.props.dispatch(resultLocation(currentRoomExits.n));
				this.props.dispatch(resultMessage('You\'ve travelled North'));
				break;
			case 'South':
				this.props.dispatch(resultLocation(currentRoomExits.s));
				this.props.dispatch(resultMessage('You\'ve travelled North'));
				break;
			case 'West':
				this.props.dispatch(resultLocation(currentRoomExits.w));
				this.props.dispatch(resultMessage('You\'ve travelled West'));
				break;
			case 'East':
				this.props.dispatch(resultLocation(currentRoomExits.e));
				this.props.dispatch(resultMessage('You\'ve travelled East'));
				break;
		}


	}
	handleAction = (action) => (e) => {
		e.preventDefault();

		const { gameData } = this.props;
		const actions = gameData.actions;
		console.log('if action was available then it must be valid - but i could double check? maybe i might need to do if game is restored from a saved');
		const results = actions.filter(a => {
			return a.action === action
		})[0].results;

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
				this.props.dispatch(resultTake(data));
				break;
			case 'drop':
				this.props.dispatch(resultDrop(data));
				break;
			case 'changeScore':

				this.props.dispatch(resultScore(data));
				break;
			case 'changeLocation':
				this.props.dispatch(resultLocation(data));
				break;
			case 'destroys':
				this.props.dispatch(resultDestroy(data));
				break;
			case 'addMoney':
				this.props.dispatch(resultMoney(data));
				break;
			case 'removeMoney':
				this.props.dispatch(resultMoney(-data));
				break;
			case 'changeRoomDesc':
				this.props.dispatch(resultRoomDesc(data));
				break;
			case 'createExit':
				this.props.dispatch(resultCreateExit(data));
				break;
			case 'restart':
			
				this.props.dispatch(initData(initdata));
				break;
			default:
				console.warn('WARNING result = [' + key + '] is not being processed!');
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
		const unsortedExits = getAllowedExits(currentRoomData).map(exit => {
			if (exit === 'n') return 'North';
			if (exit === 's') return 'South';
			if (exit === 'w') return 'West';
			if (exit === 'e') return 'East';
			if (exit === 'u') return 'Up';
			if (exit === 'd') return 'Down';
			return null;
		});
		//Howerver the data arrive always show n,s,w,e,u,d
		const allowableExits = unsortedExits.filter(e=>{
			return e==='North';
		}).concat(unsortedExits.filter(e=>{
			return e==='South';
		}).concat(unsortedExits.filter(e=>{
			return e==='West';
		}).concat(unsortedExits.filter(e=>{
			return e==='East';
		}).concat(unsortedExits.filter(e=>{
			return e==='Up';
		}).concat(unsortedExits.filter(e=>{
			return e==='Down';
		}))))));
		
		const allowableActions = getAllowedActions(objects, actions, roomId, money).map(action => {
			return action.action;
		});



		return (
			<Fragment>
				<div className='actions'>
					{allowableExits.length > 0 &&
						allowableExits.map((exit, index) => {
							return <button key={index} onClick={this.handleMove(exit)}>{exit}</button>
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
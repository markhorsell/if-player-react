
import { IItem, IRoomData, IAction } from "../types"

export const getRoomData = (roomId: string | number, rooms: Array<IRoomData>): IRoomData => {
	const roomData = rooms.filter(room => room.id === roomId)[0];
	return roomData;
}

export const getInventory = (items: Array<IItem>): Array<IItem> => {
	const inventory = items.filter((item: IItem) => item.loc === 'INV').map((item: IItem) => item);
	return inventory;
}
export const getLocationObjects = (roomId: number | string, items: Array<IItem>): Array<IItem> => {
	//return the whole object as may want to filter on visibility later
	const locObjects = items.filter((item: IItem) => item.loc === roomId).map((item: IItem) => item);
	return locObjects;
}

export const getAllowedExits = (roomData: IRoomData): Array<string> => {
	const allowedExits: Array<string> = [];
	Object.keys(roomData.exits).forEach(function (key) {
		var val = roomData.exits[key];
		if (val !== '0') {
			allowedExits.push(key);
		}
	});
	return (allowedExits);
}
export const getAllowedActions = (items: Array<IItem>, actions: Array<IAction>, roomID: string | number, money: number) => {

	//console.log(actions)
	let allowableActions = [];
	let actionsToCheck = actions;
	// ONLY return actions that meet the conditions
	for (let i = 0; i < actions.length; i++) {
		//console.log(actions)
		let condition = actions[i].conditions;

		let allowed = true;
		// Are Carrying Condition
		if (condition.hasOwnProperty('areCarrying')) {
			let isCarrying = 0;
			for (let j = 0; j < items.length; j++) {
				for (let k = 0; k < condition.areCarrying.length; k++) {
					if (condition.areCarrying[k] === items[j].obj) {
						if (items[j].loc === 'INV') {
							isCarrying++;
						}
					}
				}
			}
			if (isCarrying !== condition.areCarrying.length) {
				allowed = false;
			}
		}
		// Room Contains Condition
		if (condition.hasOwnProperty('roomContains')) {
			let roomContains = 0;
			for (let j = 0; j < items.length; j++) {
				for (let k = 0; k < condition.roomContains.length; k++) {
					if (condition.roomContains[k] === items[j].obj) {
						if (items[j].loc === roomID) {
							roomContains++;
						}
					}
				}
			}

			if (roomContains !== condition.roomContains.length) {
				allowed = false;
			}
		}
		// Is specific location condition
		if (condition.hasOwnProperty('location')) {
			let isValidLocation = false;
			if (condition.location === roomID) {
				isValidLocation = true;
			}
			if (isValidLocation === false) {
				allowed = false;
			}
		}
		// Do you need money?
		if (condition.hasOwnProperty('haveMoney')) {
			let hasMoney = false;
			if (money >= condition.haveMoney) {
				hasMoney = true;
			}
			if (hasMoney === false) {
				allowed = false;
			}
		}

		if (allowed === true) {
			allowableActions.push(actionsToCheck[i]);
		}
	}
	//console.log(allowableActions)
	return allowableActions.map((action: IAction) => {
		return action;
	});
}
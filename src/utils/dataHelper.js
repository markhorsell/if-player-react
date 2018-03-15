

export const getRoomData = (roomId,rooms) => {
    const roomData = rooms.filter(room => room.id===roomId)[0];
    return roomData; 
  }

export const getInventory = (objects) => {
    const inventory = objects.filter(object => object.loc==='INV').map(object => object.obj);
    return inventory;
}
export const getAllowedActions = (objects,actions,room,money) => {

	let allowableActions= [];

	/*
	console.log(money);
	console.log(room);
	console.log(actions);
	console.log(objects);
	*/

	
	
		let actionsToCheck = actions;
		// ONLY return actions that meet the conditions
		for (let i = 0; i < actions.length; i++) {
			let condition = actions[i].conditions;
			
			let allowed = true;
			// Are Carrying Condition
			if (condition.hasOwnProperty('areCarrying')) {
				let isCarrying = 0;
				for (let j = 0; j < objects.length; j++) {
					for (let k = 0; k < condition.areCarrying.length; k++) {
						if (condition.areCarrying[k] === objects[j].obj) {
							if (objects[j].loc === 'INV') {
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
				for (let j = 0; j < objects.length; j++) {
					for (let k = 0; k < condition.roomContains.length; k++) {
						if (condition.roomContains[k] === objects[j].obj) {
							if (objects[j].loc === room) {
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
				if (condition.location === room) {
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
		return allowableActions;

   
   
}
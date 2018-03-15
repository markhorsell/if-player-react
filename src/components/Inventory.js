import React from 'react';




const Inventory = ({ items=[] }) => {

	const inventory = items.join(",");
	return (
	<div>You are carrying : {inventory}</div>
	)
	}

export default Inventory;


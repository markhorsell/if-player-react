import React from 'react';




const Inventory = ({ items=[] }) => {

	const inventory = items.join(",");
	return (
	<div>{inventory}</div>
	)
	}

export default Inventory;


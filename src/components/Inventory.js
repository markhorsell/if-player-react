import React from 'react';
import PropTypes from 'prop-types';

const Inventory = ({ items = [],money=0 }) => {
	const inventory = items.map((item=>{
		return item.desc;
	})).join(", ")+' and '+money+' coins.';
	
	return (
	
		<div className='inventory'>
		<div>You are carrying :</div>
		<div>{inventory}</div>
		</div>
	
	)
}
Inventory.propTypes = {
	items: PropTypes.array.isRequired,
}

export default Inventory;


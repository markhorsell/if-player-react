import React from 'react';
import PropTypes from 'prop-types';

const Inventory = ({ items = [],money=0 }) => {

	const inventory = items.join(",")+' and '+money+' coins';
	return (
		<div className='inventory'>You are carrying : {inventory}</div>
	)
}
Inventory.propTypes = {
	items: PropTypes.array.isRequired,
}

export default Inventory;


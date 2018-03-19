import React from 'react';
import PropTypes from 'prop-types';

const Inventory = ({ items = [] }) => {

	const inventory = items.join(",");
	return (
		<div>You are carrying : {inventory}</div>
	)
}
Inventory.propTypes = {
	items: PropTypes.array.isRequired,
}

export default Inventory;


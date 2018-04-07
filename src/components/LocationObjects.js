import React from 'react';
import PropTypes from 'prop-types';

const LocationObjects = ({ items = [] }) => {
	const locationObjects = items.filter((item) =>{
		
		return item.show!==false;
	}).map((item)=>{
		return item.desc;
	}).join(",");
	return (
		<div>In this place : {locationObjects}</div>
	)
}
LocationObjects.propTypes = {
	items: PropTypes.array.isRequired,
}

export default LocationObjects;


import React from 'react';

const LocationObjects = ({ items=[] }) => {
	const locationObjects = items.join(",");
	return (
	<div>In this place are : {locationObjects}</div>
	)
	}

export default LocationObjects;


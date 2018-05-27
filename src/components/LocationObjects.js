import React from 'react';
import PropTypes from 'prop-types';

const LocationObjects = ({ items = [] }) => {
	const locationObjects = items.filter((item) => {

		return item.show !== false;
	}).map((item) => {
		return item.desc;
	}).join(", ");
	return (
		<div className='location-objects'>
			<div>In this place :</div>
			{locationObjects.length > 0 ? (
				<div>{locationObjects}.</div>
			) : (
					<div>Nothing of interest.</div>
				)}


		</div>
	)
}
LocationObjects.propTypes = {
	items: PropTypes.array.isRequired,
}

export default LocationObjects;


import React from 'react';
import PropTypes from 'prop-types';

import './RoomDescription.css';


const RoomDescription = ({ description }) => (
	<div className="room-description">{description}</div>
	)

RoomDescription.propTypes = {
	description: PropTypes.string.isRequired,
}


export default RoomDescription;


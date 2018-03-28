import React from 'react';
import PropTypes from 'prop-types';

import './RoomDescription.css';


const Message = ({ message }) => (
	<div className="room-description">{message}</div>
	)

    Message.propTypes = {
        message: PropTypes.string.isRequired,
}


export default Message;


import React from 'react';
import PropTypes from 'prop-types';




const Message = ({ message }) => (
	<div className="message">{message}</div>
	)

    Message.propTypes = {
        message: PropTypes.string.isRequired,
}


export default Message;


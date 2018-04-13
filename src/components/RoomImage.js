import React from 'react';
import PropTypes from 'prop-types';

//import './RoomDescription.css';


const RoomImage = ({ path,image }) => (
	<React.Fragment>
		<div className="room-image">
		<img src={path+image} width='100%'  alt={image}/>
		</div>
	</React.Fragment>
	)

	RoomImage.propTypes = {
		path: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	}

export default RoomImage;
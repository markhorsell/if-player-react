import React from 'react';

//import './RoomDescription.css';


const RoomImage = ({ imageURL }) => (
	<React.Fragment>
		<div className="room-image">{imageURL}</div>
		<img src={imageURL} width='100%' height='100%'/>
	</React.Fragment>
	)

export default RoomImage;
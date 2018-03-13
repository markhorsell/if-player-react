import React from 'react';

//import './RoomDescription.css';


const RoomImage = ({ path,image }) => (
	<React.Fragment>
		<div className="room-image">{path+image}</div>
		<img src={path+image} width='100%' height='100%' alt={image}/>
	</React.Fragment>
	)

export default RoomImage;
import React from 'react';
import PropTypes from 'prop-types';
import styled  from "styled-components/macro"

const ImageDiv = styled.div`
margin:0px 10px 0px 10px;
max-width:600px;
`

interface IProps {
	path:string;
	image:string;
}


const RoomImage :React.SFC<IProps> = ({ path,image }) => (
	
		<ImageDiv>
		<img src={path+image} width='100%'  alt={image}/>
		</ImageDiv>

	)

	RoomImage.propTypes = {
		path: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	}

export default RoomImage;
import React from 'react';
import PropTypes from 'prop-types';

import styled  from "styled-components"

const DescDiv = styled.div`

	margin-top:4px;
	line-height:20px;
	
`




const RoomDescription = ({ description }) => (
	<DescDiv>{description}</DescDiv>
	)

RoomDescription.propTypes = {
	description: PropTypes.string.isRequired,
}


export default RoomDescription;


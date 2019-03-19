import React from 'react';
import PropTypes from 'prop-types';

import styled  from "styled-components/macro"

const DescDiv = styled.div`

	margin-top:4px;
	line-height:20px;
	
`

type Props = {
	description:string
}

const RoomDescription = ({ description }:Props) => (
	<DescDiv>{description}</DescDiv>
	)

RoomDescription.propTypes = {
	description: PropTypes.string.isRequired,
}


export default RoomDescription;


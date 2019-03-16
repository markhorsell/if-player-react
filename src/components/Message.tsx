import React from 'react';
import PropTypes from 'prop-types';
import styled  from "styled-components"

const MessageDiv = styled.div`
    margin-top:10px;
`;

type Props = {
	message:string
}

const Message = ({ message }:Props) => (
	<MessageDiv>{message}</MessageDiv>
	)

    Message.propTypes = {
        message: PropTypes.string.isRequired,
}


export default Message;


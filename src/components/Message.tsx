import React, {FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components/macro"

const MessageDiv = styled.div`
    margin-top:10px;
`;

type IProps = {
    message: string
}

const Message: FunctionComponent <IProps> = ({ message }) => (
    <MessageDiv>{message}</MessageDiv>
)

Message.propTypes = {
    message: PropTypes.string.isRequired,
}


export default Message;


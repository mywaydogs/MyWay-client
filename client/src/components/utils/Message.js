import React from 'react';
import styled from 'styled-components';

const SUCCESS_HEADER_COLOR = 'rgb(15,101,0)'
const SUCCESS_BG_COLOR = 'rgba(0,221,15, 0.2)'
const SUCCESS_TEXT_COLOR = 'rgb(25,151,0)'

const ERROR_HEADER_COLOR = 'rgb(200, 0, 0)';
const ERROR_BG_COLOR = 'rgb(255, 0, 0, 0.2)'
const ERROR_TEXT_COLOR = 'rgb(150, 0, 0)'

const MessageDiv = styled.div`
    background-color: ${props => props.variant === 'Success' ? SUCCESS_BG_COLOR : ERROR_BG_COLOR};
    width: 100%;
    border-radius: 10px;
    padding: 0px 10px 2px 10px;
    margin: 5px 0;
    color: ${props => props.variant === 'Success' ? SUCCESS_TEXT_COLOR : ERROR_TEXT_COLOR};
    border: 1px solid ${props => props.variant === 'Success' ? SUCCESS_HEADER_COLOR : ERROR_HEADER_COLOR};

    & h3 {
        font-size: 1.5rem;
        color: ${props => props.variant === 'Success' ? SUCCESS_HEADER_COLOR : ERROR_HEADER_COLOR};
    }
`;

function Message({ variant, header, content, ...props }) {
    if (header.length === 0 && content.length === 0) {
        return <></>;
    }
    return (
        <MessageDiv variant={variant}>
            <h3>
                {header}
            </h3>
            <p>
                {content}
            </p>
        </MessageDiv>
    );
}

export default Message;
import React from "react";
import styled, { keyframes } from "styled-components";

const StyledButton = styled.button`
  position: relative;
  outline: none;
  background-color: #333;
  border: 0px;
  margin: 5px 5px;
  padding: ${(props) =>
    props.size === "small"
      ? "4px 15px"
      : props.size === "medium"
      ? "7px 20px"
      : "10px 40px"};
  color: white;
  border-radius: 10px;
  font-size: ${(props) =>
    props.size === "small"
      ? "1rem"
      : props.size === "medium"
      ? "1.2rem"
      : "1.5rem"};
  cursor: pointer;
  transition: all 0.25s ease;

  &:active {
    transform: scale(0.85);
  }
`;

const loadingAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const LoadingDiv = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;

  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 3px solid #fff;
    width: 20px;
    height: 20px;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    animation: ${loadingAnimation} 1s ease infinite;
    z-index: 1;
  }
`;

function Button({ isSubmitting, value, size = "small", ...props }) {
  size = size.toLowerCase();
  return (
    <StyledButton {...{ size, ...props }}>
      {value}
      {isSubmitting && <LoadingDiv />}
    </StyledButton>
  );
}

export default Button;

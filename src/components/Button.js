import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyle = css`
  border: none;
  border-radius: 5px;
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
  color: white;
  outline: none;
  cursor: pointer;
  background-color: #343a40;
  &:hover {
    background-color: grey;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props}></StyledLink>
  ) : (
    <StyledButton {...props}></StyledButton>
  );
};
export default Button;

import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background-color: grey;
  &:hover {
    background-color: lightgrey;
  }
`;

const Button = (props) => <StyledButton {...props}></StyledButton>;
export default Button;

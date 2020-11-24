import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import { withRouter } from "react-router-dom";
import logo from "../img/logo.png";

const Wrapper = styled(Responsive)`
  margin-top: 4rem;
  height: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 12rem;
    cursor: pointer;
  }
  #intro {
    margin-top: 2rem;
    font-size: 1.2rem;
    background-color: beige;
  }
`;

const Navbar = ({ history, children }) => {
  const goToMainPage = () => {
    history.push("/");
  };

  return (
    <Wrapper>
      <img src={logo} onClick={goToMainPage} alt="logo" />
      <div id="intro">{children}</div>
    </Wrapper>
  );
};

export default withRouter(Navbar);

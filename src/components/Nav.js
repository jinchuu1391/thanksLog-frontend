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
  justify-content: center;
  img {
    width: 12rem;
  }
  .logo {
    width: 12rem;
    cursor: pointer;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Navbar = ({ history }) => {
  const goToMainPage = () => {
    history.push("/");
  };

  return (
    <Wrapper>
      <div className="logo">
        <img src={logo} onClick={goToMainPage} alt="logo" />
      </div>
    </Wrapper>
  );
};

export default withRouter(Navbar);

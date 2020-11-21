import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import { withRouter } from "react-router-dom";
import logo from "../img/logo.png";
import writeDefault from "../img/writeDefault.png";
import writeOnHover from "../img/writeOnHover.png";
import myMenuDefault from "../img/myMenuDefault.png";
import myMenuOnHover from "../img/myMenuOnHover.png";
import logoutDefault from "../img/logoutDefault.png";
import logoutOnHover from "../img/logoutOnHover.png";
import loginOnDefault from "../img/loginOnDefault.png";
import loginOnHover from "../img/loginOnHover.png";

const Wrapper = styled.div`
  background-color: rgba(30, 30, 30);
  width: 100%;
  bottom: 0;
  position: fixed;
  height: 6rem;
`;

const Innner = styled(Responsive)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 60px;
  }
  .buttons {
    &:hover {
      cursor: pointer;
    }
    & img:last-child {
      display: none;
    }
    &:hover img:last-child {
      display: block;
    }
    &:hover img:first-child {
      display: none;
    }
  }
  .right {
    display: flex;
  }
`;

const BottomNavbar = ({ history }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };

  const goToWritePage = () => {
    history.push("/write");
  };

  const goToProfilePage = () => {
    history.push("");
  };

  const goToLoginPage = () => {
    history.push("/login");
  };
  return (
    <Wrapper>
      <Innner>
        {isLoggedIn ? (
          <>
            <div className="left">
              <div className="buttons" onClick={goToWritePage}>
                <img id="writeDefault" src={writeDefault} alt="write"></img>
                <img id="writeOnHover" src={writeOnHover} alt="write"></img>
              </div>
            </div>
            <div className="right">
              <div className="buttons">
                <img src={myMenuDefault} alt="myMenu"></img>
                <img src={myMenuOnHover} alt="myMenu"></img>
              </div>
              <div className="buttons" onClick={logoutHandler}>
                <img src={logoutDefault} alt="logout"></img>
                <img src={logoutOnHover} alt="logout"></img>
              </div>
            </div>
          </>
        ) : (
          <>
            <div></div>
            <div className="buttons" onClick={goToLoginPage}>
              <img src={loginOnDefault} alt="login" />
              <img src={loginOnHover} alt="login" />
            </div>
          </>
        )}
      </Innner>
    </Wrapper>
  );
};

export default withRouter(BottomNavbar);

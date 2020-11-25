import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Responsive from "./Responsive";
import { withRouter } from "react-router-dom";
import writeDefault from "../img/writeDefault.png";
import writeOnHover from "../img/writeOnHover.png";
import myMenuDefault from "../img/myMenuDefault.png";
import myMenuOnHover from "../img/myMenuOnHover.png";
import logoutDefault from "../img/logoutDefault.png";
import logoutOnHover from "../img/logoutOnHover.png";
import loginOnDefault from "../img/loginOnDefault.png";
import loginOnHover from "../img/loginOnHover.png";
import axios from "axios";

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
  #testLogin {
    color: white;
    &:hover {
      cursor: pointer;
      background-color: beige;
      color: black;
      border-radius: 5px;
    }
  }
`;

const BottomNavbar = ({ history }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth);
  const isLoggedIn = userInfo.isLoggedIn;
  const usermail = userInfo.user;

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };

  const goToWritePage = () => {
    history.push("/write");
  };

  const goToProfilePage = () => {
    history.push(`/@${usermail}`);
  };

  const goToLoginPage = () => {
    history.push("/login");
  };
  const testLoginHandler = () => {
    axios
      .post(
        "http://54.180.83.133:3000/auth/signin",
        {
          email: "test@mail.com",
          password: "test",
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", "test@mail.com");
        dispatch({ type: "LOGIN", user: "test@mail.com" });
      })
      .catch((err) => {
        console.error(err);
      });
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
              <div className="buttons" onClick={goToProfilePage}>
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
            <div id="testLogin" onClick={testLoginHandler}>
              테스트 계정으로 로그인(기업용)
            </div>
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

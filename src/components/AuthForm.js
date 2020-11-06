import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

const AuthFormWrapper = styled.div`
  h3 {
    margin: 0;
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: green;
    &:hover {
      color: darkgreen;
    }
  }
`;

const modeMap = {
  login: "로그인",
  register: "회원가입",
};

const AuthForm = ({ type, history }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const { email, username, password, passwordConfirm } = form;

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (type === "register") {
      axios
        .post(
          "http://localhost:4000/auth/signup",
          {
            email: email,
            username: username,
            password: password,
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
          history.push("/");
        })
        .catch((err) => {
          if (err.response.data.code === "409") {
            alert("이미 사용중인 메일 입니다");
          }
        });
    } else if (type === "login") {
      axios
        .post(
          "http://localhost:4000/auth/signin",
          {
            email: email,
            password: password,
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
          dispatch({ type: "LOGIN" });
          history.push("/");
        })
        .catch((err) => {
          if (err.response.data.code === "401a") {
            alert("존재하지 않는 계정입니다");
          } else if (err.response.data.code === "401b") {
            alert("잘못된 정보 입니다");
          }
        });
    }
  };

  const mode = modeMap[type];
  return (
    <AuthFormWrapper>
      <h3>{mode}</h3>
      <form>
        <StyledInput
          name="email"
          placeholder="이메일"
          onChange={onChange}
        ></StyledInput>
        {type === "register" && (
          <StyledInput
            name="username"
            placeholder="이름"
            onChange={onChange}
          ></StyledInput>
        )}
        <StyledInput
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
        ></StyledInput>
        {type === "register" && (
          <StyledInput
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
          ></StyledInput>
        )}
        <Button onClick={loginHandler}>{mode}</Button>
      </form>
      <Footer>
        {type === "login" ? (
          <Link to="signup">회원가입</Link>
        ) : (
          <Link to="login">로그인</Link>
        )}
      </Footer>
    </AuthFormWrapper>
  );
};

export default withRouter(AuthForm);

import React, { useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";

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

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const AuthForm = ({ type }) => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const mode = modeMap[type];
  return (
    <AuthFormWrapper>
      <h3>{mode}</h3>
      <form>
        <StyledInput name="email" placeholder="이메일"></StyledInput>
        {type === "register" && (
          <StyledInput name="username" placeholder="이름"></StyledInput>
        )}
        <StyledInput
          name="password"
          type="password"
          placeholder="비밀번호"
        ></StyledInput>
        {type === "register" && (
          <StyledInput
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
          ></StyledInput>
        )}
        <Button>{mode}</Button>
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

export default AuthForm;

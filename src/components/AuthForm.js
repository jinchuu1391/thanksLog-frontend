import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

const AuthFormWrapper = styled.div`
  .formContainer {
    display: flex;
  }
  .form_right {
    width: 50%;
    display: flex;
    justify-content: center;
    img {
      border: 1px solid black;
      border-radius: 50%;
      width: 180px;
      height: 180px;
    }
  }
  form {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
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
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const { email, username, password, passwordConfirm } = form;

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };
  const onImgSelect = (e) => {
    e.preventDefault();
    setImg(e.target.files[0]);
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = (e) => {
      setImgPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (type === "register") {
      const Data = new FormData();
      Data.append("email", email);
      Data.append("username", username);
      Data.append("password", password);
      Data.append("img", img);
      axios
        .post("http://localhost:4000/auth/signup", Data, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          dispatch({ type: "LOGIN" });
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
      <div className="formContainer">
        <form encType="multipart/form-data">
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
            <>
              <StyledInput
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                type="password"
                onChange={onChange}
              ></StyledInput>
              <input type="file" onChange={onImgSelect}></input>
            </>
          )}
          <Button onClick={loginHandler}>{mode}</Button>
        </form>
        <div className="form_right">
          {type === "register" && <img id="preview" src="" alt="프사"></img>}
        </div>
      </div>
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

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      border-radius: 50%;
      width: 180px;
      height: 180px;
      margin-bottom: 1rem;
    }
  }
  form {
    display: flex;
    .formLeft {
      width: 50%;
      display: flex;
      flex-direction: column;
    }
  }
  h3 {
    margin: 0;
    margin-bottom: 1rem;
  }
  .filebox label {
    margin-bottom: 0.5rem;
    display: inline-block;
    padding: 0.5rem;
    color: #fff;
    background-color: #343a40;
    cursor: pointer;
    border-radius: 5px;
  }

  .filebox label:hover {
    background-color: grey;
  }

  .filebox input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
const LongButton = styled(Button)`
  width: 50%;
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
    introduce: "",
  });
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const { email, username, introduce, password, passwordConfirm } = form;

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
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImgPreview(null);
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (type === "register") {
      if (password !== passwordConfirm) {
        return alert("비밀번호를 다시 확인해주세요");
      }
      const Data = new FormData();
      Data.append("email", email);
      Data.append("username", username);
      Data.append("password", password);
      Data.append("introduce", introduce);
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
          console.log(err.response.status);
          if (err.response.status === "409") {
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
          dispatch({ type: "LOGIN", user: email });
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
      <form encType="multipart/form-data">
        <div className="formLeft">
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
              <StyledInput
                name="introduce"
                onChange={onChange}
                placeholder="자신을 소개해주세요(선택)"
              ></StyledInput>
            </>
          )}
        </div>
        {type === "register" && (
          <div className="form_right">
            <img
              src={
                imgPreview
                  ? imgPreview
                  : "https://user-images.githubusercontent.com/62422486/98907760-b282a200-2502-11eb-9e27-acb392842a92.png"
              }
              alt="profilePhoto"
            ></img>
            <div className="filebox">
              <label for="ex_file" onChange={onImgSelect}>
                이미지 업로드
              </label>
              <input type="file" id="ex_file" onChange={onImgSelect}></input>
            </div>
          </div>
        )}
      </form>
      <LongButton onClick={loginHandler}>{mode}</LongButton>

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

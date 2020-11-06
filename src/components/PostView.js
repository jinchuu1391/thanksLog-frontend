import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import img from "../img/profile.png";
import axios from "axios";
import { withRouter } from "react-router-dom";
import timeConverter from "../helper/timeConverter";
import { useSelector } from "react-redux";

const PostViewWrapper = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid lightgrey;
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const SubInfo = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 1.2rem;
  margin-top: 1rem;
  color: grey;
  span {
    padding-left: 1rem;
  }
  /* span + span:before {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: "\\B7";
  } */
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;

const PostContent = styled.div`
  font-size: 1.3rem;
  color: #343a40;
`;

const PostView = ({ id, match, history }) => {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [body, setBody] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const idFromParams = match.params.postId;

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다");
      history.push("/");
    }
    axios
      .post(`http://localhost:4000/post/${id ? id : idFromParams}`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res.data.content[0]);
        setTitle(res.data.content[0].title);
        setUsername(res.data.content[0].User.username);
        setCreatedAt(timeConverter(res.data.content[0].createdAt));
        setBody(res.data.content[0].content);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      {isLoggedIn ? (
        <PostViewWrapper>
          <PostHead>
            <h1>{title}</h1>
            <SubInfo>
              <img src={img} alt="프사"></img>
              <span>
                <b>{username}</b>
                <br></br>
                {createdAt}
              </span>
            </SubInfo>
          </PostHead>
          <PostContent dangerouslySetInnerHTML={{ __html: body }}></PostContent>
        </PostViewWrapper>
      ) : (
        <PostViewWrapper>
          <PostHead>
            <h1>가입해주세요:D</h1>
          </PostHead>
        </PostViewWrapper>
      )}
    </>
  );
};

export default withRouter(PostView);

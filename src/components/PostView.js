import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
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

const NeedLogin = styled.div`
  text-align: center;
  font-size: 3rem;
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
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    cursor: pointer;
  }
  b {
    cursor: pointer;
  }
`;

const PostContent = styled.div`
  font-size: 1.3rem;
  color: #343a40;
  min-height: 300px;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 1.3rem;
  color: #343a40;
  border: 1px solid grey;
  border-radius: 5px;
  outline: none;
  padding: 1rem;
`;

const PostView = ({ id, match, history }) => {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [body, setBody] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [email, setEmail] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const idFromParams = match.params.postId;
  useEffect(() => {
    axios
      .post(`http://localhost:4000/post/${id ? id : idFromParams}`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.content[0]) {
          setTitle(res.data.content[0].title);
          setUsername(res.data.content[0].User.username);
          setCreatedAt(timeConverter(res.data.content[0].createdAt));
          setBody(res.data.content[0].content);
          setProfilePhoto(res.data.content[0].User.profile_photo_url);
          setEmail(res.data.content[0].User.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idFromParams]);

  const goToProfile = () => {
    history.push(`/@${email}`);
  };

  return (
    <>
      {isLoggedIn ? (
        <PostViewWrapper>
          <PostHead>
            <h1>{title}</h1>
            <SubInfo>
              <img src={profilePhoto} alt="프사" onClick={goToProfile}></img>
              <span>
                <b onClick={goToProfile}>{username}</b>
                <br></br>
                {createdAt}
              </span>
            </SubInfo>
          </PostHead>
          <PostContent dangerouslySetInnerHTML={{ __html: body }}></PostContent>
          <CommentInput placeholder={"댓글을 써보세요!"}></CommentInput>
        </PostViewWrapper>
      ) : (
        <PostViewWrapper>
          <NeedLogin>로그인 해주세요:D</NeedLogin>
        </PostViewWrapper>
      )}
    </>
  );
};

export default withRouter(PostView);

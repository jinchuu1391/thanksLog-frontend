import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import axios from "axios";
import { withRouter } from "react-router-dom";
import timeConverter from "../helper/timeConverter";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import image from "../img/profile.png";
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

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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

const SmallButton = styled(Button)`
  width: 80px;
`;

const CommentItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  align-items: flex-start;
  color: #343a40;
  & + & {
    border-top: 1px solid lightgrey;
  }
  .comment {
    font-size: 1.3rem;
    padding-bottom: 0.5rem;
  }
`;

const CommentItemUpper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-bottom: 1rem;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const CommentItem = withRouter(({ comment, history }) => {
  return (
    <CommentItemWrapper>
      <CommentItemUpper>
        <img src={image} alt="" />
        <UserInfo>
          <div>유저이름</div>
          <div>2020년 00월 00일 00시 00분</div>
        </UserInfo>
      </CommentItemUpper>
      <div className="comment">테스트 코멘트 입니다</div>
    </CommentItemWrapper>
  );
});

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
          console.log(res.data.content[0]);
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
          <InputWrapper>
            <CommentInput placeholder={"댓글을 써보세요!"}></CommentInput>
            <SmallButton>등록</SmallButton>
          </InputWrapper>
          <CommentItem></CommentItem>
          <CommentItem></CommentItem>
          <CommentItem></CommentItem>
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

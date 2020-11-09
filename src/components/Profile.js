import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthTemplate from "./AuthTemplate";
import img from "../img/profile.png";
import timeConverter from "../helper/timeConverter";

const ProfileWrapper = styled(AuthTemplate)`
  width: 700px;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .button {
    color: green;
    cursor: pointer;
  }
  .imageSection {
    img {
      width: 100px;
      height: 100px;
    }
  }
  .userInfoSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .rightSection {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;
const PostInfo = styled.div`
  height: 50%;
`;

const PostItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  &:first-child {
    padding-top: 2rem;
  }
  & + & {
    border-top: 1px solid lightgrey;
  }
`;

const PostItem = ({ post }) => {
  return (
    <PostItemWrapper>
      <div className="title">{post.title}</div>
      <div className="createdAt">{timeConverter(post.createdAt)}</div>
    </PostItemWrapper>
  );
};

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/auth/mypage", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setUsername(res.data[0].username);
        setEmail(res.data[0].email);
        setPosts(res.data[0].Contents);
      })
      .catch((err) => console.log(err));
  });

  const postItems = posts.map((post) => {
    return <PostItem post={post} key={post.id}></PostItem>;
  });
  return (
    <ProfileWrapper>
      <UserInfo>
        <div className="imageSection">
          <img src={img} alt="프사"></img>
          <div className="button">사진 올리기</div>
          <div className="button">사진 삭제</div>
        </div>
        <div className="userInfoSection">
          <div>{username}</div>
          <div>{email}</div>
          <div>주니어 개발자 입니다</div>
        </div>
        <div className="rightSection">
          <div className="button">수정하기</div>
          <div className="button">탈퇴하기</div>
        </div>
      </UserInfo>
      <PostInfo>{postItems}</PostInfo>
    </ProfileWrapper>
  );
};

export default Profile;

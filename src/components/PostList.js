import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import Button from "../components/Button";
import img from "../img/profile.png";
import { useSelector } from "react-redux";
import axios from "axios";
import timeConverter from "../helper/timeConverter";

const PostListWrapper = styled(Responsive)`
  margin-top: 3rem;
`;
const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemWrapper = styled.div`
  display: flex;
  padding-top: 0.5rem;
  align-items: center;
  padding-bottom: 0.5rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid lightgrey;
  }
`;

const SubInfo = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  img {
    width: 80px;
    height: 80px;
    border: 1px solid black;
    border-radius: 50%;
  }
  .username {
    margin-top: 0.5rem;
    color: grey;
  }
`;

const Left = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  .title {
    font-size: 2.5rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      cursor: pointer;
    }
  }
  .createdAt {
    color: grey;
  }
`;

const PostItem = ({ post }) => {
  const { title, User, createdAt } = post;
  return (
    <PostItemWrapper>
      <Left>
        <div className={"title"}>{title}</div>
        <div className={"createdAt"}>{timeConverter(createdAt)}</div>
      </Left>
      <SubInfo>
        <img src={User.profile_photo_url} alt="프사"></img>
        <div className={"username"}>{User.username}</div>
      </SubInfo>
    </PostItemWrapper>
  );
};

const PostList = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/post").then((res) => setPosts(res.data));
    // axios
    // .get("http://localhost:4000/post")
    // .then((res) => console.log(res.data));
  });

  const postItems = posts.map((post) => {
    return <PostItem post={post} key={post.id}></PostItem>;
  });

  return (
    <PostListWrapper>
      <WritePostButtonWrapper>
        {isLoggedIn && <Button to="write">새 글 작성하기</Button>}
      </WritePostButtonWrapper>
      <div>{postItems}</div>
    </PostListWrapper>
  );
};

export default PostList;

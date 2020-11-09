import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import Button from "../components/Button";
import img from "../img/profile.png";
import { useSelector } from "react-redux";
import axios from "axios";
import timeConverter from "../helper/timeConverter";
import { withRouter } from "react-router-dom";

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

const PostItem_right = styled.div`
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
    cursor: pointer;
  }
  .username {
    margin-top: 0.5rem;
    color: grey;
    cursor: pointer;
  }
`;

const PostItem_left = styled.div`
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

const PostItem = withRouter(({ post, history }) => {
  const { title, User, createdAt } = post;

  const onTitleClick = () => {
    history.push(`/post/${post.id}`);
  };

  const onUserClick = () => {
    console.log("clicked");
  };

  return (
    <PostItemWrapper>
      <PostItem_left>
        <div className={"title"} onClick={onTitleClick}>
          {title}
        </div>
        <div className={"createdAt"}>{timeConverter(createdAt)}</div>
      </PostItem_left>
      <PostItem_right>
        <img
          src={User.profile_photo_url}
          alt="프사"
          onClick={onUserClick}
        ></img>
        <div className={"username"} onClick={onUserClick}>
          {User.username}
        </div>
      </PostItem_right>
    </PostItemWrapper>
  );
});

const PostList = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/post").then((res) => setPosts(res.data));
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

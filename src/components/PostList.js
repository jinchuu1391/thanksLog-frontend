import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import axios from "axios";
import timeConverter from "../helper/timeConverter";
import { withRouter } from "react-router-dom";

const PostListWrapper = styled(Responsive)`
  margin-top: 3rem;
  margin-bottom: 10rem;
`;

const PostItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid lightgrey;
  }
`;

const PostItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const PostItemRight = styled.div`
  padding-left: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  color: grey;
  .upperSection {
    display: flex;
    justify-content: space-between;
  }
  .upperSection .title {
    font-size: 1.5rem;
    color: #343a40;
    &:hover {
      cursor: pointer;
    }
  }
  .upperSction .createdAt {
    color: grey;
  }
  .lowerSection {
    display: flex;
    justify-content: space-between;
    .username {
      /* margin-top: 0.5rem; */
      color: grey;
      cursor: pointer;
    }
  }
`;

const PostItem = withRouter(({ post, history }) => {
  const { title, User, createdAt } = post;

  const onTitleClick = () => {
    history.push(`/${post.id}`);
  };

  const onUserClick = () => {
    history.push(`/@${post.User.email}`);
  };

  return (
    <PostItemWrapper>
      <PostItemLeft>
        <img
          src={User.profile_photo_url}
          alt="프사"
          onClick={onUserClick}
        ></img>
      </PostItemLeft>
      <PostItemRight>
        <div className="upperSection">
          <div className="title" onClick={onTitleClick}>
            {title}
          </div>
          <div className="createdAt">{timeConverter(createdAt)}</div>
        </div>
        <div className="lowerSection">
          <div className="username" onClick={onUserClick}>
            {User.username}
          </div>
          <div className="subInfo">{post.Comments.length}개의 댓글</div>
        </div>
      </PostItemRight>
    </PostItemWrapper>
  );
});

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://54.180.83.133:3000/post")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const postItems = posts.map((post) => {
    return <PostItem post={post} key={post.id}></PostItem>;
  });

  return (
    <PostListWrapper>
      <div>{postItems.reverse()}</div>
    </PostListWrapper>
  );
};

export default PostList;

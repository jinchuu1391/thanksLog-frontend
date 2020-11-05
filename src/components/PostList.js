import React from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import Button from "../components/Button";
import img from "../img/profile.png";

const PostListWrapper = styled(Responsive)`
  margin-top: 3rem;
`;
const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid lightgrey;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      cursor: pointer;
    }
  }
  p {
    margin-top: 2rem;
  }
`;
const SubInfo = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  color: grey;
  margin-top: 1rem;
  span {
    padding-left: 1rem;
  }
  span + span:before {
    content: "\\B7";
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  img {
    width: 70px;
    height: 70px;
  }
`;

const PostItem = () => {
  return (
    <PostItemWrapper>
      <h2>제목</h2>
      <SubInfo>
        <img src={img} alt="프사"></img>
        <span>
          <b>username</b>
          {/* </span> */}
          {/* <span> */}
          <br></br>
          {new Date().toLocaleDateString()}
        </span>
      </SubInfo>
      <p>포스트 내용의 일부분</p>
    </PostItemWrapper>
  );
};

const PostList = () => {
  return (
    <PostListWrapper>
      <WritePostButtonWrapper>
        <Button to="write">새 글 작성하기</Button>
      </WritePostButtonWrapper>
      <div>
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
      </div>
    </PostListWrapper>
  );
};

export default PostList;

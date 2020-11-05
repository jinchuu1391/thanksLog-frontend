import React from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import Button from "../components/Button";

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
  color: grey;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  content: "\\B7";
`;

const PostItem = () => {
  return (
    <PostItemWrapper>
      <h2>제목</h2>
      <SubInfo>
        <span>
          <b>username</b>
        </span>
      </SubInfo>
    </PostItemWrapper>
  );
};

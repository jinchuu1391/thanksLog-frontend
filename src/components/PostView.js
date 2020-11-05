import React from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import img from "../img/profile.png";

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

const PostView = () => {
  return (
    <PostViewWrapper>
      <PostHead>
        <h1>제목</h1>
        <SubInfo>
          <img src={img} alt="프사"></img>
          <span>
            <b>tester</b>
            {/* </span> */}
            {/* <span> */}
            <br></br>
            {new Date().toLocaleDateString()}
          </span>
        </SubInfo>
      </PostHead>
      <PostContent
        dangerouslySetInnerHTML={{ __html: "<p>HTML <b>내용</b>입니다.</p>" }}
      ></PostContent>
    </PostViewWrapper>
  );
};

export default PostView;

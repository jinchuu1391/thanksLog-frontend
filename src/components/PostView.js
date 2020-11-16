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
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    cursor: pointer;
  }
  b {
    cursor: pointer;
  }
  .subInfo_text {
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    .onlyWriter span {
      padding-right: 0.5rem;
      cursor: pointer;
      &:hover {
        color: #343a40;
        font-weight: bold;
      }
    }
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

const CommentsWrapper = styled.div`
  margin-bottom: 300px;
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
  .commentWriter {
    cursor: pointer;
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

const CommentItem = withRouter(({ comment, history }) => {
  const goToProfile = () => {
    history.push(`/@${comment.User.email}`);
  };
  const commentRemoveHandler = () => {
    console.log("delete");
  };
  return (
    <CommentItemWrapper>
      <CommentItemUpper>
        <SubInfo>
          <img
            src={comment.User.profile_photo_url}
            alt="프사"
            onClick={goToProfile}
          ></img>
          <div className="subInfo_text">
            <b onClick={goToProfile}>{comment.User.username}</b>
            <span>{timeConverter(comment.createdAt)}</span>
            <div className="onlyWriter">
              <span onClick={commentRemoveHandler}>삭제</span>
              <span>수정</span>
            </div>
          </div>
        </SubInfo>
      </CommentItemUpper>
      <div className="comment">{comment.comment}</div>
    </CommentItemWrapper>
  );
});

const PostView = ({ match, history }) => {
  const [postData, setPostData] = useState({
    title: "",
    createdAt: "",
    content: "",
    Comments: [],
    User: {},
  });
  const { title, createdAt, content, Comments, User } = postData;
  const { username, profile_photo_url, email } = User ? User : "";
  const [comment, setComment] = useState("");
  const [rerender, setRerender] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const idFromParams = match.params.postId;

  useEffect(() => {
    axios
      .post(`http://localhost:4000/post/${idFromParams}`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.content[0]) {
          setCurrentUser(res.data.currentUser);
          setPostData(res.data.content[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idFromParams, rerender]);

  const goToProfile = (userMail) => {
    history.push(`/@${userMail}`);
  };

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const commentHadler = () => {
    axios
      .post("http://localhost:4000/comment", {
        comment: comment,
        contentId: idFromParams,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setComment("");
        setRerender(!rerender);
      })
      .catch((err) => console.log(err));
  };

  const postRemoveHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:4000/post/${idFromParams}`, {
          data: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          history.goBack();
        })
        .catch((err) => console.error(err));
    }
  };

  const commentItems = Comments.map((commentItem) => {
    return (
      <CommentItem comment={commentItem} key={commentItem.id}></CommentItem>
    );
  });

  return (
    <>
      {isLoggedIn ? (
        <PostViewWrapper>
          <PostHead>
            <h1>{title}</h1>
            <SubInfo>
              <img
                src={profile_photo_url}
                alt="프사"
                onClick={() => goToProfile(email)}
              ></img>
              <div className="subInfo_text">
                <b onClick={() => goToProfile(email)}>{username}</b>
                <span>{timeConverter(createdAt)}</span>
                {email === currentUser && (
                  <div className="onlyWriter">
                    <span onClick={postRemoveHandler}>삭제</span>
                    <span>수정</span>
                  </div>
                )}
              </div>
            </SubInfo>
          </PostHead>
          <PostContent
            dangerouslySetInnerHTML={{ __html: content }}
          ></PostContent>
          <InputWrapper>
            <CommentInput
              placeholder={"댓글을 써보세요!"}
              onChange={onCommentChange}
              value={comment}
            ></CommentInput>
            <SmallButton onClick={commentHadler}>등록</SmallButton>
          </InputWrapper>
          <CommentsWrapper>{commentItems.reverse()}</CommentsWrapper>
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

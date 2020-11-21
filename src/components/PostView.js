import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import axios from "axios";
import { withRouter } from "react-router-dom";
import timeConverter from "../helper/timeConverter";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";

const PostViewWrapper = styled(Responsive)`
  margin-top: 3rem;
  margin-bottom: 9rem;
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
    width: 80px;
    height: 80px;
    object-fit: cover;
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
    .onlyWriterCanSee span {
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
  min-height: 20rem;
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

const CommentItemLower = styled.div`
  width: 100%;
`;

const CommentItem = withRouter(({ comment, history, currentUser }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState("");

  useEffect(() => {
    setCommentToEdit(comment.comment);
  }, []);
  const dispatch = useDispatch();
  const goToProfile = () => {
    history.push(`/@${comment.User.email}`);
  };
  const commentRemoveHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .delete("http://localhost:4000/comment/", {
          data: {
            token: localStorage.getItem("token"),
            commentId: comment.id,
          },
        })
        .then((res) => {
          dispatch({ type: "RERENDER" });
        })
        .catch((err) => console.error(err));
    }
  };
  const commentEditHandler = () => {
    setIsEditMode(true);
  };
  const onChange = (e) => {
    setCommentToEdit(e.target.value);
  };
  const onCancel = () => {
    setCommentToEdit(comment.comment);
    setIsEditMode(!isEditMode);
  };
  const onCommentUpdate = () => {
    axios
      .patch("http://localhost:4000/comment/", {
        comment: commentToEdit,
        commentId: comment.id,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setIsEditMode(!isEditMode);
        dispatch({ type: "RERENDER" });
      })
      .catch((err) => console.error(err));
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
            {currentUser === comment.User.email && (
              <div className="onlyWriterCanSee">
                <span onClick={commentRemoveHandler}>삭제</span>
                <span onClick={commentEditHandler}>수정</span>
              </div>
            )}
          </div>
        </SubInfo>
      </CommentItemUpper>
      <CommentItemLower>
        {isEditMode ? (
          <InputWrapper>
            <CommentInput
              onChange={onChange}
              placeholder={"댓글을 써보세요!"}
              value={commentToEdit}
            ></CommentInput>
            <SmallButton onClick={onCancel}>취소</SmallButton>
            <SmallButton onClick={onCommentUpdate}>등록</SmallButton>
          </InputWrapper>
        ) : (
          <div className="comment">{comment.comment}</div>
        )}
      </CommentItemLower>
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
  const [currentUser, setCurrentUser] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const rerenderSign = useSelector((state) => state.rerender.rerender);
  const idFromParams = match.params.postId;
  const dispatch = useDispatch();

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
  }, [idFromParams, rerenderSign]);

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
        dispatch({ type: "RERENDER" });
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

  const postEditHandler = () => {
    dispatch({ type: "CHANGE_TITLE", title: title });
    dispatch({ type: "CHANGE_BODY", body: content });
    dispatch({ type: "EDIT_MODE", id: idFromParams });
    history.push("/write");
  };

  const commentItems = Comments.map((commentItem) => {
    return (
      <CommentItem
        comment={commentItem}
        currentUser={currentUser}
        key={commentItem.id}
      ></CommentItem>
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
                  <div className="onlyWriterCanSee">
                    <span onClick={postRemoveHandler}>삭제</span>
                    <span onClick={postEditHandler}>수정</span>
                  </div>
                )}
              </div>
            </SubInfo>
          </PostHead>
          <div className="ql-editor">
            <PostContent
              dangerouslySetInnerHTML={{ __html: content }}
            ></PostContent>
          </div>
          <InputWrapper>
            <CommentInput
              placeholder={"댓글을 써보세요!"}
              onChange={onCommentChange}
              value={comment}
            ></CommentInput>
            <SmallButton onClick={commentHadler}>등록</SmallButton>
          </InputWrapper>
          <div>{commentItems.reverse()}</div>
          {/* <CommentsWrapper></CommentsWrapper> */}
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

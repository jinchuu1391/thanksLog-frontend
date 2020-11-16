import React from "react";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Responsive from "../components/Responsive";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

const WritePage = ({ history }) => {
  const dispatch = useDispatch();
  const { id, title, body, editMode } = useSelector((state) => state.post);
  const postHandler = () => {
    axios
      .post("http://localhost:4000/post", {
        title: title,
        content: body,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        alert("ERROR! 관리자에게 문의하세요");
      });
  };
  const updateHandler = () => {
    axios
      .patch(`http://localhost:4000/post/${id}`, {
        title: title,
        content: body,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        dispatch({ type: "RERENDER" });
        history.push(`/${id}`);
      })
      .catch((err) => console.error(err));
  };
  return (
    <Responsive>
      <Editor></Editor>
      {editMode ? (
        <Button onClick={updateHandler}>수정하기</Button>
      ) : (
        <Button onClick={postHandler}>글 올리기</Button>
      )}
    </Responsive>
  );
};

export default withRouter(WritePage);

import React from "react";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Responsive from "../components/Responsive";
import axios from "axios";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const WritePage = ({ history }) => {
  const { title, body } = useSelector((state) => state.post);

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

  return (
    <Responsive>
      <Editor></Editor>
      <Button onClick={postHandler}>글 올리기</Button>
    </Responsive>
  );
};

export default withRouter(WritePage);

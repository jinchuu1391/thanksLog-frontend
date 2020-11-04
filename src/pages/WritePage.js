import React from "react";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Responsive from "../components/Responsive";
const WritePage = () => {
  return (
    <Responsive>
      <Editor></Editor>
      <Button>글 올리기</Button>
    </Responsive>
  );
};

export default WritePage;

import React, { useRef, useEffect } from "react";
import Quill from "quill";
import styled from "styled-components";
import "quill/dist/quill.bubble.css";
import Responsive from "../components/Responsive";

const EditorWrapper = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
  }
`;
const Editor = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder:
        "내용을 써주세요, 텍스트를 드래그하면 스타일을 수정할 수 있어요!",
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });
  }, []);

  return (
    <EditorWrapper>
      <TitleInput placeholder="제목을 입력하세요"></TitleInput>
      <QuillWrapper>
        <div ref={quillElement}></div>
      </QuillWrapper>
    </EditorWrapper>
  );
};
export default Editor;

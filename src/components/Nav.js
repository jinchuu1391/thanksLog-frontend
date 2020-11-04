import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Navbar = () => {
  return (
    <Wrapper>
      <div className="logo">함께쓰는 감사노트</div>
      <div className="right">
        <Button to="/login">로그인</Button>
      </div>
    </Wrapper>
  );
};

export default Navbar;

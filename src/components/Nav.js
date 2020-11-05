import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";

const Wrapper = styled(Responsive)`
  margin-top: 15px;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    color: #343a40;
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
      <div className="logo">함께쓰는 감사일기</div>
      <div className="right">
        <Button to="/login">로그인</Button>
      </div>
    </Wrapper>
  );
};

export default Navbar;

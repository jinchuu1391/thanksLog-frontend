import React from "react";
import styled from "styled-components";
import logo from "../img/thankyou.png";
const Nav = styled.div`
  font-size: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
`;

const Navbar = () => {
  return (
    <Nav>
      <div>
        <a href="#">
          <img width="100px" src={logo} alt="logo"></img>
        </a>
        함께쓰는 감사노트
      </div>
      <div>로그인</div>
    </Nav>
  );
};

export default Navbar;

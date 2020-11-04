import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WhiteBox = styled.div`
  .logo_container {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  background-color: white;
  width: 390px;
  padding: 2rem;
  border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthWrapper>
      <WhiteBox>
        <div className="logo_container">
          <Link to="/">함께쓰는 감사노트</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthWrapper>
  );
};

export default AuthTemplate;

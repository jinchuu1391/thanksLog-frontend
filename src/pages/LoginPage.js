import React from "react";
import AuthTemplate from "../components/AuthTemplate";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div>
      <AuthTemplate>
        <AuthForm type="login"></AuthForm>
      </AuthTemplate>
    </div>
  );
};

export default LoginPage;

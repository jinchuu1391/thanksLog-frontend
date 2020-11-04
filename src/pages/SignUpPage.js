import React from "react";
import AuthTemplate from "../components/AuthTemplate";
import AuthForm from "../components/AuthForm";

const SignUpPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="register"></AuthForm>
    </AuthTemplate>
  );
};

export default SignUpPage;

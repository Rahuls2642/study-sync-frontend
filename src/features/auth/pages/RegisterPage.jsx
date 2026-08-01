import React from "react";
import { AuthLayout } from "../components/AuthLayout";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <AuthLayout isLogin={false}>
      <RegisterForm />
    </AuthLayout>
  );
};

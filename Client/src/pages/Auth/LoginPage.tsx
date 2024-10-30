import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/Fragments/Auth/LoginForm";
import { useToken } from "@/context/TokenContext";
import AuthLayout from "@/Layouts/AuthLayout";

export const LoginPage = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  if (token) {
    navigate("/dashboard");
  }
  return (
    <AuthLayout header="Aplikasi Divisi ITS">
      <LoginForm />
    </AuthLayout>
  );
};

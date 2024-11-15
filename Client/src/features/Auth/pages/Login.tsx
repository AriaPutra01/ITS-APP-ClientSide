import LoginForm from "@/features/Auth/components/Fragments/LoginForm";
import AuthLayout from "@/features/Auth/components/layouts/AuthLayout";

export const Login = () => {
  return (
    <AuthLayout header="Aplikasi Divisi ITS">
      <LoginForm />
    </AuthLayout>
  );
};

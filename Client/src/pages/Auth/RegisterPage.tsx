import { RegisterForm } from "@/components/Fragments/Auth/RegisterForm";
import AuthLayout from "../../Layouts/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout header="Halaman Tambah Akun">
      <RegisterForm />
    </AuthLayout>
  );
};

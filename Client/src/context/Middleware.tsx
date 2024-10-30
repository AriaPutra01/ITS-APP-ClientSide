import { useNavigate } from "react-router-dom";
import { useToken } from "./TokenContext";

// memeriksa jika belum login dilempar ke halaman login
export function IsLogin({ children }: any) {
  const navigate = useNavigate();
  const { token } = useToken();
  if (!token) {
    navigate("/login");
  }
  return children;
}

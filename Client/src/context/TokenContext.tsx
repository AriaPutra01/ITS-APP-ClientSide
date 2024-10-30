import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

type TokenContextType = {
  token: string | null;
  userDetails: any;
};

type Credentials = {
  username: string;
  email: string;
  role: string;
};

const TokenContext = createContext({} as TokenContextType);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [userDetails, setUserDetails] = useState<Credentials | {}>({});

  useEffect(() => {
    if (token) {
      const decoded: Credentials = jwtDecode(token);
      setUserDetails({
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,
      });
    } else {
      setUserDetails({});
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, userDetails }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};

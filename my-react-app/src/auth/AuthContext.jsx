import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useJwt } from "react-jwt";
import { loginUser, logoutUser, refreshToken } from "../servises/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [token, setToken] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function authentication() {
      const localToken = localStorage.getItem("token");

      if (localToken !== null) {
        const mydecodedToken = jwtDecode(localToken);
        try {
          if (mydecodedToken.exp / 1000 - Date.now() < 120000) {
            const result = await refreshToken();
            const token = result.data.accessToken;
            localStorage.setItem("token", token);
            setToken(token);
          }
        } catch (error) {
          console.error("Ошибка:", error);
          setAuthentication(false);
        } finally {
          setIsLoadingAuth(false);
        }
      }
    }
    authentication();
  }, []);

  async function login({ email, password, deviceId }) {
    const result = await loginUser({ email, password, deviceId });
    try {
      if (result.data) {
        const token = result.data.accessToken;
        localStorage.setItem("token", token);
        setToken(token);
        setAuthentication(true);
      }
    } catch (error) {
      setError(result.error);
      console.error("Ошибка:", result.error);
      setAuthentication(false);
    } finally {
      setIsLoadingAuth(false);
    }
  }

  async function logout() {
    const result = await logoutUser();
    {
      result.success ? setAuthentication(false) : setAuthentication(true);
    }
  }
  return (
    <AuthContext.Provider
      value={{ token, error, isLoadingAuth, login, logout, authentication }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

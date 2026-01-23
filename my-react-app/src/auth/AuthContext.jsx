import { createContext, useState, useContext, useEffect } from "react";
import { useJWT } from "react-jwt";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const { decodedToken } = useJWT();

  useEffect(() => {
    async function authentication() {
      const localToken = localStorage.getItem("token");

      if (localToken !== null) {
        const mydecodedToken = decodedToken(localToken);
        try {
          if (mydecodedToken.exp / 1000 - Date.now() < 120000) {
            const refreshToken = await refreshToken();
            const token = refreshToken.data.accessToken;
            localStorage.setItem("token", token);
            setToken(token);
          }
        } catch (error) {
          console.error("Ошибка:", refreshToken.error);
        } finally {
          setIsLoadingAuth(false);
        }
      }
    }
    authentication();
  }, []);

  async function login({ email, password }) {
    const result = await loginUser({ email, password });
    try {
      if (result.data) {
        const token = result.data.accessToken;
        localStorage.setItem("token", token);
        setToken(token);
      }
    } catch (error) {
      setError(result.error);
      console.error("Ошибка:", result.error);
    } finally {
      setIsLoadingAuth(false);
    }
  }
  return (
    <AuthContext.Provider value={{ token, error, isLoadingAuth, login }}>
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

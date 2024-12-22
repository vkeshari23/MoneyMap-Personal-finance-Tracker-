import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    }
    else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [auth.token]);

  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData?.user && parsedData?.token) {
          setAuth({
            user: parsedData.user,
            token: parsedData.token,
          });
        }
      } catch (error) {
        console.error('Error parsing auth data from localStorage', error);
      }
    }
  }, []);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };

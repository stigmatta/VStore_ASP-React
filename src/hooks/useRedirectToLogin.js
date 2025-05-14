import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const useRedirectToLogin = (url) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(url, { withCredentials: true });
        setIsAuthorized(true); // Якщо авторизований, дозволяємо продовжувати
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("API Error:", error);
        }
      }
    };

    checkAuth();
  }, [navigate, url]);

  return isAuthorized;
};

export default useRedirectToLogin;

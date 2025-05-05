import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const useRedirectToLogin = (url) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(url, { withCredentials: true });
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
};

export default useRedirectToLogin;

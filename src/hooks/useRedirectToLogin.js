import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const useRedirectToLogin = (url) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("API Error:", error);
        }
      });
  }, [navigate, url]);
};

export default useRedirectToLogin;

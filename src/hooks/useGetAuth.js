import { useEffect, useState } from "react";
import axios from "axios";

const useGetAuth = () => {
  const [data, setData] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get("https://localhost:7192/api", {
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { data };
};

export default useGetAuth;

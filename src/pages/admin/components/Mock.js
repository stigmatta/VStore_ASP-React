import { useEffect, useState } from "react";
import axios from "axios";
import Unauthorized from "../../../components/Unauthorized";

export default function Mock() {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7192/api/admin", {
          withCredentials: true,
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("API Error:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error.response?.status === 401 && <Unauthorized />}</div>;
  }

  return <div>{data || "Loading..."}</div>;
}

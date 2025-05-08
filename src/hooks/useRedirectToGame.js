import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useRedirectToGame() {
  const navigate = useNavigate();

  const redirectToGame = async (id) => {
    try {
      console.log("Sending ID:", id);
      const response = await axios.post(
        `https://localhost:7192/api/game`,
        { id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Game data fetched:", response.data);
      navigate(`/game/${id}`, {
        state: { game: response.data },
      });
    } catch (error) {
      console.error("Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  };

  return redirectToGame;
}

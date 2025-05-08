import axios from "axios";

export const addToWishlist = async ({ game, userId, navigate = null }) => {
  if (!userId) {
    navigate?.("/login");
    return { success: false, message: "Please log in first." };
  }

  try {
    const response = await axios.post(
      "https://localhost:7192/api/wishlist/add",
      game.id,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return { success: true, message: "Game successfully added to wishlist!" };
  } catch (error) {
    console.error(error);
    if (error.response) {
      return {
        success: false,
        message: error.response.data || "Failed to add to wishlist",
      };
    }
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

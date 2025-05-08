// cartUtils.js
export const addToCart = ({ game, userId, navigate = null }) => {
  if (userId == null) {
    if (navigate) navigate("/login");
    return { success: false, message: "User is not logged in" };
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex((item) => item.id === game.id);
  if (existingItemIndex !== -1) {
    return { success: false, message: "Game is already in cart" };
  }

  cart.push({
    id: game.id,
    title: game.title,
    price: game.price,
    logoLink: game.logoLink,
    releaseDate: new Date(game?.releaseDate).toISOString(),
    addedAt: new Date().toISOString(),
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  return { success: true, message: "Game successfully added to cart!" };
};

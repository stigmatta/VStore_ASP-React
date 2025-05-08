import PageTitle from "../components/PageTitle";
import TransparentButton from "../components/TransparentButton";
import React, { useEffect, useState } from "react";
import ListGame from "../components/ListGame";
import NotifyWishlist from "../components/NotifyWishlist";
import Select from "../components/Select";
import useRedirectToLogin from "../hooks/useRedirectToLogin";
import axios from "axios";
import useRedirectToGame from "../hooks/useRedirectToGame";
import useGetAuth from "../hooks/useGetAuth";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import useSnackbar from "../hooks/useSnackbar";

export default function WishlistPage() {
  useRedirectToLogin("https://localhost:7192/api/wishlist");
  const { openSnackbar, isSuccess, snackMessage, createSnackbar, handleClose } =
    useSnackbar();
  const [games, setGames] = useState([]);
  const handleGameClick = useRedirectToGame();
  const userId = useGetAuth();
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState("");
  const sortOptions = [
    { label: "None", value: "" },
    { label: "Top Rated", value: "top" },
    { label: "On Sale", value: "sale" },
  ];

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7192/api/wishlist",
          { withCredentials: true },
        );
        setGames(response.data);
      } catch (error) {
        createSnackbar(false, "Failed to fetch wishlist");
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  const handleGameRemoved = (removedGameId) => {
    setGames((prevGames) => prevGames.filter((g) => g.id !== removedGameId));
    createSnackbar(true, "Game removed from wishlist!");
  };

  return (
    <div className="flex flex-col">
      <CustomSnackbar
        close={handleClose}
        isError={!isSuccess}
        message={snackMessage}
        open={openSnackbar}
      />

      <div className="flex flex-row justify-between mb-8">
        <PageTitle title="My Wishlist" />
        <TransparentButton title="0.00 UAH" radius="20px" />
      </div>

      <NotifyWishlist />

      <div className="w-[5rem] mb-5">
        <Select
          onChange={(e) => setSortValue(e.target.value)}
          value={sortValue}
          items={sortOptions}
        />
      </div>

      <div className="flex flex-col l:flex-row gap-8">
        <div className="flex w-full flex-col gap-8">
          {games.map((game) => (
            <ListGame
              key={game.id}
              game={game}
              isCart={false}
              onRemoveSuccess={handleGameRemoved}
              onClick={() => handleGameClick(game.id)}
              userId={userId}
              navigate={navigate}
              onMoveSuccess={(success, message) =>
                createSnackbar(success, message)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

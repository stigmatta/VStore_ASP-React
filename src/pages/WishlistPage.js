import PageTitle from "../components/PageTitle";
import TransparentButton from "../components/TransparentButton";
import React, { useEffect, useState } from "react";
import ListGame from "../components/ListGame";
import NotifyWishlist from "../components/NotifyWishlist";
import Select from "../components/Select";
import useRedirectToLogin from "../hooks/useRedirectToLogin";
import axios from "axios";

export default function WishlistPage() {
  useRedirectToLogin("https://localhost:7192/api/wishlist");
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7192/api/wishlist",
          {
            withCredentials: true,
          },
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);
  const handleGameRemoved = (removedGameId) => {
    setGames((prevGames) =>
      prevGames.filter((game) => game.id !== removedGameId),
    );
  };
  const [sortValue, setSortValue] = React.useState("");
  const sortOptions = [
    { label: "None", value: "" },
    { label: "Top Rated", value: "top" },
    { label: "On Sale", value: "sale" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mb-8">
        <PageTitle title="My Wishlist" />
        <TransparentButton title="0.00 UAH" radius="20px" />
      </div>
      <div>
        <NotifyWishlist />
      </div>
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
            <div key={game.id}>
              <ListGame
                game={game}
                onRemoveSuccess={handleGameRemoved}
                isCart={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

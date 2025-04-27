import PageTitle from "../components/PageTitle";
import TransparentButton from "../components/TransparentButton";
import TheEndOfTheSun from "../images/the-end-of-the-sun.png";
import React from "react";
import ListGame from "../components/ListGame";
import NotifyWishlist from "../components/NotifyWishlist";
import Select from "../components/Select";
import useRedirectToLogin from "../hooks/useRedirectToLogin";

export default function WishlistPage() {
  useRedirectToLogin("https://localhost:7192/api/wishlist");
  const games = Array(6).fill({
    title: "The End of the Sun",
    image: TheEndOfTheSun,
    price: 515,
    date: new Date("2025-02-27T17:00:00"),
  });

  const overallPrice = games.reduce((total, item) => total + item.price, 0);

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
          {games.map((game, index) => (
            <div key={index}>
              <ListGame game={game} isCart={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

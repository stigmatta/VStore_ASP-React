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
import usePagination from "../utils/usePagination";
import CustomPagination from "../components/CustomPagination";
import CustomLoader from "../components/CustomLoader";
import getOverallPrice from "../utils/getOverallPrice";

export default function WishlistPage() {
  const userId = useGetAuth();
  useRedirectToLogin(`https://localhost:7192/api/wishlist`);
  const { openSnackbar, isSuccess, snackMessage, createSnackbar, handleClose } =
    useSnackbar();
  const { page, setPage, totalItems, setTotalItems, itemsPerPage } =
    usePagination(1, 10);
  const [games, setGames] = useState([]);
  const handleGameClick = useRedirectToGame();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [overallPrice, setOverallPrice] = useState(0.0);
  const [sortValue, setSortValue] = useState("");
  const sortOptions = [
    { label: "None", value: "none" },
    { label: "Top Rated", value: "top" },
    { label: "On Sale", value: "sale" },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/wishlist?pageNumber=${page}&pageSize=${itemsPerPage}&sortOption=${sortValue}`,
          { withCredentials: true },
        );
        const { games, totalCount } = response.data;
        setGames(games);
        setTotalItems(totalCount || 0);
      } catch (error) {
        createSnackbar(false, "Failed to fetch wishlist");
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [page, sortValue]);

  useEffect(() => {
    setPage(1);
  }, [sortValue, setPage]);

  const handleGameRemoved = (removedGameId) => {
    setGames((prevGames) => prevGames.filter((g) => g.id !== removedGameId));
    createSnackbar(true, "Game removed from wishlist!");
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="flex flex-col">
      <CustomSnackbar
        close={handleClose}
        isError={!isSuccess}
        message={snackMessage}
        open={openSnackbar}
      />

      <div className="flex flex-row justify-between items-center mb-8">
        <PageTitle title="My Wishlist" />
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
      {totalItems > itemsPerPage &&
        (sortValue === "none" || games.length >= itemsPerPage) && (
          <CustomPagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage) => setPage(newPage)}
            currentPage={page}
          />
        )}
    </div>
  );
}

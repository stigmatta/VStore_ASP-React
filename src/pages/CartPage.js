import React, { useEffect, useState } from "react";

import PageTitle from "../components/PageTitle";
import TransparentButton from "../components/TransparentButton";
import ListGame from "../components/ListGame";
import GreenButton from "../components/GreenButton";

import { Backdrop, Dialog, DialogContent } from "@mui/material";
import CheckoutModal from "../components/CheckoutModal";
import ReceiptModal from "../components/ReceiptModal";
import useRedirectToLogin from "../hooks/useRedirectToLogin";
import useRedirectToGame from "../hooks/useRedirectToGame";
import useSnackbar from "../hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import getOverallPrice from "../utils/getOverallPrice";
import axios from "axios";
import CustomLoader from "../components/CustomLoader";

export default function CartPage() {
  useRedirectToLogin("https://localhost:7192/api/cart");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [savedMethod, setSavedMethod] = useState(null);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [overallPrice, setOverallPrice] = useState(0.0);
  const [overallStr, setOverallStr] = useState("");
  const handleGameClick = useRedirectToGame();
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const { openSnackbar, isSuccess, snackMessage, createSnackbar, handleClose } =
    useSnackbar();

  useEffect(() => {
    if (
      error &&
      typeof error === "string" &&
      error.includes("in your library")
    ) {
      createSnackbar(false, error);
    }
  }, [error]);

  useEffect(() => {
    const fetchSavedMethod = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7192/api/cart/savedMethod",
          {
            withCredentials: true,
          },
        );
        setSavedMethod(response.data);
      } catch (err) {
        console.error("Failed to fetch saved method:", err);
        setSavedMethod(null);
      }
    };

    fetchSavedMethod();
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setGames(cartItems);
    const sum = getOverallPrice(cartItems);
    setOverallPrice(sum);
    setOverallStr(sum.toFixed(2) + " $");
  }, []);

  useEffect(() => {
    const sum = getOverallPrice(games);
    setOverallPrice(sum);
    setOverallStr(sum.toFixed(2) + " $");
  }, [games]);

  const handleOpenCheck = () => {
    setOpen(true);
  };

  const handleCloseCheck = () => {
    setOpen(false);
  };

  const successedOrder = () => {
    localStorage.removeItem("cart");
    setGames([]);
    setOpen(false);
    setIsBackdropOpen(true);
  };

  const handleBackdropClose = () => {
    setIsBackdropOpen(false);
  };

  const handleGameRemoved = (removedGameId) => {
    setGames((prevGames) => {
      const newGames = prevGames.filter((g) => g.id !== removedGameId);
      localStorage.setItem("cart", JSON.stringify(newGames));
      return newGames;
    });
    createSnackbar(true, "Game removed from the cart!");
  };

  return (
    <div className="flex flex-col">
      <CustomSnackbar
        close={handleClose}
        isError={!isSuccess}
        message={snackMessage}
        open={openSnackbar}
      />
      <div className="flex flex-row justify-between items-center mb-8">
        <PageTitle title="My Cart" />
      </div>
      <div className="flex flex-col l:flex-row gap-8">
        <div className="flex w-full flex-col gap-8">
          {games.map((game, index) => (
            <div key={index}>
              <ListGame
                game={game}
                onRemoveSuccess={handleGameRemoved}
                onClick={() => handleGameClick(game.id)}
                userId={"user"}
                isCart={true}
                navigate={navigate}
                onMoveSuccess={(success, message) =>
                  createSnackbar(success, message)
                }
              />
            </div>
          ))}
        </div>
        {games.length > 0 && (
          <div className="flex flex-col gap-2 mx-auto w-full lg:w-2/3 l:mx-0 l:w-[290px]">
            <div className="flex flex-row justify-between font-semibold text-title">
              <span>Total:</span>
              <span>{overallStr}</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Tax:</span>
              <span>4%</span>
            </div>
            <p className="text-text opacity-90">
              Of their respective owners in the US and other countries. VAT
              included in all prices where applicable
            </p>
            <div onClick={handleOpenCheck}>
              <GreenButton
                weight="700"
                width="100%"
                height="47px"
                text="Check out"
              />
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleCloseCheck}
        PaperProps={{
          sx: { width: "80%", bgcolor: "#393E46", maxWidth: "80%" },
        }}
      >
        <DialogContent sx={{ color: "#EEEEEE", padding: 0 }}>
          <CheckoutModal
            success={successedOrder}
            close={handleCloseCheck}
            games={games}
            savedMethod={savedMethod}
            setError={setError}
          />
        </DialogContent>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: 1300 }}
        open={isBackdropOpen}
        onClick={handleBackdropClose}
      >
        <ReceiptModal />
      </Backdrop>
    </div>
  );
}

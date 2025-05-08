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

export default function CartPage() {
  useRedirectToLogin("https://localhost:7192/api/cart");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const handleGameClick = useRedirectToGame();
  const isAuth = useState(false);
  const [games, setGames] = useState([]);
  const { openSnackbar, isSuccess, snackMessage, createSnackbar, handleClose } =
    useSnackbar();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    setGames(cartItems);
  }, []);

  const handleOpenCheck = () => {
    setOpen(true);
  };

  const handleCloseCheck = () => {
    setOpen(false);
  };

  const successedOrder = () => {
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

  const overallPrice = games.reduce((total, item) => total + item.price, 0);
  const overallStr = overallPrice.toFixed(2) + " $";

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
        <TransparentButton title="0.00 UAH" radius="20px" />
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
      </div>

      {/* Dialog for Checkout Modal */}
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

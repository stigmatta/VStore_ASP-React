import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

import FormAccordion from "./FormAccordion";
import LabelVisa from "./LabelVisa";
import CardDetails from "./CardDetails";
import LabelMastercard from "./LabelMastercard";
import OrderSummary from "./OrderSummary";
import BreakLine from "./BreakLine";
import useGetImages from "../hooks/useGetImages";
import axios from "axios";

export default function CheckoutModal({
  games,
  success,
  close,
  savedMethod,
  setError,
}) {
  useEffect(() => {
    setSelected(savedMethod);
    console.log(savedMethod);
  }, [savedMethod]);
  const [selected, setSelected] = useState(null);
  const [cardValidity, setCardValidity] = useState({
    visa: false,
    mastercard: false,
  });
  const isSelectedCardValid = selected && cardValidity[selected];
  const updateCardValidity = (cardType, isValid) => {
    setCardValidity((prev) => ({
      ...prev,
      [cardType]: isValid,
    }));
  };
  const [saveMethod, setSaveMethod] = useState(false);
  const [data, setData] = useState({});

  const withoutTax = games.reduce((price, game) => price + game.price, 0);
  const overall = withoutTax + (withoutTax / 100) * 4;
  const images = useGetImages(games.map((game) => game.logoLink));
  const newGames = games.map((game, index) => ({
    ...game,
    logoLink: images[index],
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://localhost:7192/api/cart/order",
        { games, selected, saveMethod },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      success();
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex flex-col  lg:flex-row w-full h-fit p-6 bg-gray-light gap-5 rounded-lg">
      <div className="order-2 flex flex-col flex-1 lg:order-1">
        <span className="mb-7">CHECKOUT</span>
        <div className="flex flex-col gap-3">
          <FormAccordion
            summary={
              <LabelVisa selected={selected} setSelected={setSelected} />
            }
            children={
              <CardDetails
                onValidityChange={(isValid) =>
                  updateCardValidity("visa", isValid)
                }
                setData={setData}
                isSelected={selected === "visa"}
                setSaveMethod={setSaveMethod}
              />
            }
          />
          <FormAccordion
            summary={
              <LabelMastercard selected={selected} setSelected={setSelected} />
            }
            children={
              <CardDetails
                onValidityChange={(isValid) =>
                  updateCardValidity("mastercard", isValid)
                }
                isSelected={selected === "mastercard"}
                setData={setData}
                setSaveMethod={setSaveMethod}
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-col w-full order-1  lg:w-[335px] lg:order-2">
        <div className="flex flex-row justify-between mb-8">
          <span>ORDER SUMMARY</span>
          <X
            className="hoverSvg hover:cursor-pointer"
            onClick={close}
            size={24}
          />
        </div>

        <div className="flex flex-col gap-5">
          {newGames.map((game, index) => (
            <div className="flex flex-col gap-5" key={index}>
              <div className="flex flex-row gap-3">
                <img src={game.logoLink} className="w-1/2" alt="game-image" />
                <div className="flex flex-col flex-1 w-1/2">
                  <span className="text-button font-black">{game.title}</span>
                  <span className="opacity-70">{game.publisher}</span>
                  <span className="opacity-70">{game.price.toFixed(2)} $</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 font-normal opacity-70">
                <div className="flex flex-row justify-between">
                  <span>Price</span>
                  <span>{game.price.toFixed(2)} $</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span>Taxed (4%)</span>
                  <span>{((game.price / 100) * 4).toFixed(2)} $</span>
                </div>
              </div>
              <BreakLine />
            </div>
          ))}
          <div className="flex flex-row justify-between font-bold">
            <span>Overall</span>
            <span>{overall} $</span>
          </div>
          <div className="hidden lg:block">
            <OrderSummary
              success={handleSubmit}
              selected={selected}
              isCardCorrect={isSelectedCardValid}
            />
          </div>
        </div>
      </div>

      <div className="block order-last lg:hidden">
        <OrderSummary
          selected={selected}
          success={handleSubmit}
          isCardCorrect={isSelectedCardValid}
        />
      </div>
    </div>
  );
}

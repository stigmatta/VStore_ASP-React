import { X } from "lucide-react";
import React from "react";

import FormAccordion from "./FormAccordion";
import LabelVisa from "./LabelVisa";
import CardDetails from "./CardDetails";
import LabelMastercard from "./LabelMastercard";
import OrderSummary from "./OrderSummary";
import BreakLine from "./BreakLine";
import useGetImages from "../hooks/useGetImages";

export default function CheckoutModal({ games, success, close }) {
  const [selected, setSelected] = React.useState(null);
  const withoutTax = games.reduce((price, game) => price + game.price, 0);
  const overall = withoutTax + (withoutTax / 100) * 4;
  const images = useGetImages(games.map((game) => game.logoLink));
  const newGames = games.map((game, index) => ({
    ...game,
    logoLink: images[index],
  }));

  return (
    <div className="flex flex-col  lg:flex-row w-full h-fit p-6 bg-gray-light gap-5 rounded-lg">
      <div className="order-2 flex flex-col flex-1 lg:order-1">
        <span className="mb-7">CHECKOUT</span>
        <div className="flex flex-col gap-3">
          <FormAccordion
            summary={
              <LabelVisa selected={selected} setSelected={setSelected} />
            }
            children={<CardDetails />}
          />
          <FormAccordion
            summary={
              <LabelMastercard selected={selected} setSelected={setSelected} />
            }
            children={<CardDetails />}
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
                  <span className="opacity-70">
                    UAH {game.price.toFixed(2)}
                  </span>
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
            <OrderSummary success={success} selected={selected} />
          </div>
        </div>
      </div>

      <div className="block order-last lg:hidden">
        <OrderSummary selected={selected} success={success} />
      </div>
    </div>
  );
}

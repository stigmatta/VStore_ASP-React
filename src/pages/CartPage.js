import PageTitle from "../components/PageTitle";
import TransparentButton from "../components/TransparentButton";
import TheEndOfTheSun from "../images/the-end-of-the-sun.png";
import React from "react";
import ListGame from "../components/ListGame";
import GreenButton from "../components/GreenButton";

export default function CartPage() {
    const games = Array(6).fill({
      title: "The End of the Sun",
      image: TheEndOfTheSun,
      price: 515,
      date: new Date('2025-02-27T17:00:00')
    });

    const overallPrice = games.reduce((total, item) => total + item.price, 0);

    const overallStr =  overallPrice.toFixed(2) +" UAH";

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-8">
                <PageTitle title="My Cart" />
                <TransparentButton title="0.00 UAH" radius="20px" />
            </div>
            <div className="flex flex-col l:flex-row gap-8">
                <div className="flex w-full flex-col gap-8">
                    {
                       games.map((game, index) => (
                           <div key={index}>
                                <ListGame game={game} isCart="true"/>
                           </div>
                        ))
                    }
                </div>

                <div className="flex flex-col gap-2 mx-auto w-full
                lg:w-2/3
                l:mx-0 l:w-[290px]">
                    <div className="flex flex-row justify-between font-semibold text-title">
                        <span>Total:</span>
                        <span>{overallStr}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Tax:</span>
                        <span>4%</span>
                    </div>
                    <p className="text-text opacity-90">Of their respective owners in the US and other countries. VAT included in all prices where applicable</p>
                    <GreenButton weight="700" width="100%" height="47px" text="Check out"/>
                </div>
            </div>
        </div>
    );
}

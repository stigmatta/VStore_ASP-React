import React from "react";

export default function CardDetails(){
    return (
        <div className="flex flex-col">
            <div className="h-[.5px] w-full bg-gray-lightest opacity-30"></div>
            <span className="my-5 font-normal">CARD DETAILS</span>
            <form className="flex flex-col gap-3 font-normal opacity-70 w-full">
                <label className="gap-1 flex flex-col">
                    <span>Card number</span>
                    <input type={"text"} className="bg-gray-formInput rounded h-[44px]"/>
                </label>

                <label className="gap-1 flex flex-col">
                    <span>Name on card</span>
                    <input type={"text"} className="bg-gray-formInput rounded h-[44px]"/>
                </label>

                <div className="flex flex-row w-full justify-between gap-3">
                    <label className="gap-1 flex flex-col w-[47%]">
                        <span>Expiration</span>
                        <input type={"text"} className="bg-gray-formInput rounded h-[44px]"/>
                    </label>

                    <label className="gap-1 flex flex-col w-[47%]">
                        <span>CVV</span>
                        <input type={"text"} className="bg-gray-formInput rounded h-[44px]"/>
                    </label>
                </div>

                <label className="flex gap-3 mt-4 p-0">
                    <input type={"checkbox"} className="w-8"/>
                    <span className="text-text">Save this payment method for future purchase?</span>
                </label>
                <p className="text-subtext">By choosing to save your payment information, this payment method will be selected as the default for all purchases made using Epic Games payment, including purchases in Fortnite, Rocket League, Fall Guys and the Epic Games Store. You can delete your saved payment information anytime on this payment screen or by logging in to your Epic Games account,
                    and selecting payment management in your account settings</p>
            </form>
        </div>
    )
}
import Mastercard from "../images/tabler-icon-brand-mastercard.png";
import React from "react";

export default function LabelMastercard({selected,setSelected}) {
    return(
      <label className="h-[48px] w-full flex flex-row gap-4 bg-gray items-center justify-start px-5 cursor-pointer rounded">
        <input
          type="radio"
          name="payment-method"
          value="mastercard"
          checked={selected === "mastercard"}
          onChange={() => setSelected("mastercard")}
          className="w-6 h-6 opacity-50 accent-green"
        />
        <img src={Mastercard} alt="Mastercard" />
        <span className="text-white">Mastercard</span>
      </label>
    )
}
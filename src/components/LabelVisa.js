import Visa from "../images/tabler-icon-brand-visa.png";
import React from "react";

export default function LabelVisa({selected,setSelected}) {
    return(
          <label className="h-[48px] w-full flex flex-row gap-4 bg-gray items-center justify-start px-5 cursor-pointer rounded">
            <input
              type="radio"
              name="payment-method"
              value="visa"
              checked={selected === "visa"}
              onChange={() => setSelected("visa")}
              className="w-6 h-6 opacity-50 accent-green"
            />
            <img src={Visa} alt="Visa" />
            <span className="text-white">Visa</span>
          </label>
    )
}
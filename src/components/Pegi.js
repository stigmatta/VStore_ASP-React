import Three from "../images/3R.png";
import Seven from "../images/7R.jpg";
import Twelve from "../images/12.jpg";
import Sixteen from "../images/16.jpg";
import Eighteen from "../images/18.jpg";
import React from "react";

export default function Pegi({ pegiStr }) {
  const ageRatings = {
    "PEGI 3": Three,
    "PEGI 7": Seven,
    "PEGI 12": Twelve,
    "PEGI 16": Sixteen,
    "PEGI 18": Eighteen,
  };

  return (
    <div className="h-[129px] rounded-md flex justify-start px-3 items-center gap-5">
      <img
        src={ageRatings[pegiStr] || Sixteen}
        className="w-[87px] h-[105px]"
        alt="pegi"
      />
    </div>
  );
}

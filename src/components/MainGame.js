import React from "react";
import useGetImage from "../hooks/useGetImage";
import GreenButton from "./GreenButton";
import { useNavigate } from "react-router-dom";

export default function MainGame({ item }) {
  const navigate = useNavigate();
  const mainImage = useGetImage(item?.logoLink);
  const secondImage = useGetImage(item?.gallery?.[1]);
  const thirdImage = useGetImage(item?.gallery?.[2]);
  const handleClick = () => {
    navigate(`/game/${item.id}`, {
      state: { game: item },
    });
  };
  return (
    <div className="rounded-3xl bg-form-gradient max-w-[1150px] mx-auto w-full hidden lg:flex ">
      <div className="overflow-hidden w-[40rem] xl:w-[48.125rem] h-[34.625rem]">
        <img
          src={mainImage}
          alt={item?.title || "No Image Available"}
          className="object-cover object-center w-[50rem] h-[41rem]"
        />
      </div>

      <div className="flex flex-col pt-7 px-7 pb-4">
        <h1 className="text-title font-semibold mb-2">{item?.title}</h1>
        <h2 className="mb-4 text-highlightedText">CHECK IT OUT</h2>
        <div className="flex flex-1 flex-col justify-around">
          <img
            className="h-[130px] xl:h-[160px] object-contain rounded-xl"
            src={secondImage}
            alt={secondImage}
          />
          <img
            className="h-[130px] xl:h-[160px] object-contain rounded-xl"
            src={thirdImage}
            alt={thirdImage}
          />
        </div>
        <div onClick={handleClick} className="flex w-full mt-auto ">
          <GreenButton width="100%" height="2.4rem" text="Learn more" />
        </div>
      </div>
    </div>
  );
}

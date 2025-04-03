import React from "react";
import MainImage from "../images/main_image_tmp.png"
import SecondImage from "../images/second-image.png"
import ThirdImage from "../images/third-image.png"
import FormGreenButton from "./FormGreenButton";
import GreenButton from "./GreenButton";

export default function MainGame({ title, subTitle,mainImage,secondImage,thirdImage}) {
    return (
        <div className="flex-row formInput hidden lg:flex ">
            <div className="overflow-hidden w-[40rem] xl:w-[48.125rem] h-[34.625rem]">  {/* Set fixed width and height for the container */}
              <img
                src={MainImage}
                alt={title || "No Image Available"}
                className="object-cover object-right w-[50rem] h-[41rem]"
              />
            </div>

            <div className="flex flex-col pt-7 px-7 pb-8">
                <h1 className="text-title font-semibold mb-2">{title}</h1>
                <h2 className="mb-4">{subTitle}</h2>
                <div className="flex flex-1 flex-col justify-around">
                    <img className="h-[130px] xl:h-[160px] object-contain rounded-xl" src={SecondImage} alt={secondImage} />
                    <img className="h-[130px] xl:h-[160px] object-contain rounded-xl" src={ThirdImage} alt={thirdImage} />
                </div>
                <div className="flex w-full justify-between items-center mt-auto">
                    <span className="text-green">FREE</span>
                    <GreenButton width="7rem" height="2.4rem" text="Learn more" />
                </div>
            </div>
        </div>
    );
}

import { useEffect, useRef, useState } from "react";
import Like from "../images/subway_like.png";
import Dislike from "../images/subway_dislike.png";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Review({ item }) {
  const recommendStr = item.isLiked
    ? "This user recommends this games"
    : "This user does not recommend this games";

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLongText, setIsLongText] = useState(false);
  const textRef = useRef(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (textRef.current) {
      setIsLongText(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      );
    }
  }, [item.text]);

  return (
    <div className="flex flex-col w-full min-w-[350px] gap-1">
      <div className="flex flex-row bg-gray-light rounded-md px-3 items-center w-full h-[71px]">
        <img
          className="w-[54px] h-[54px]"
          src={item.isLiked ? Like : Dislike}
          alt="review"
        />
        <div className="flex flex-col font-normal ml-3 w-full">
          <div className="flex justify-between">
            <span className="opacity-90">@{item.user}</span>
            <div className="opacity-80 text-text">
              Posted on:{" "}
              {item.date.toLocaleString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <span className="text-button sm:text-bigButton">{recommendStr}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full p-3 bg-gray-light">
        <p
          ref={textRef}
          className={`text-bigButton font-normal ${!isExpanded ? "line-clamp-5" : ""}`}
        >
          {item.text}
        </p>

        {isLongText && (
          <button
            className="text-green font-normal mt-2 ml-auto mr-10"
            onClick={toggleReadMore}
          >
            {isExpanded ? "Read Less" : "Read More..."}
          </button>
        )}

        <div className="flex gap-2">
          <span className="text-bigButton opacity-70 font-normal">
            Was review helpful?
          </span>
          <ChevronUp size={24} color="#7BC74D" />
          <ChevronDown size={24} color="#C74D4D" />
        </div>
      </div>
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import DiscountPrice from "./DiscountPrice";
import useGetImage from "../hooks/useGetImage";

function GameItem({ item }) {
  const imageUrl = useGetImage(item?.logoLink);

  return (
    <div className="flex flex-row items-center gap-8">
      <img
        className="w-[94px]"
        src={imageUrl}
        alt={item.title || "Game image"}
      />
      <div className="flex flex-col gap-3">
        <span className="text-bigButton font-black">{item.title}</span>
        <DiscountPrice
          price={item.price}
          discount={item.discount}
          direction="row"
        />
      </div>
    </div>
  );
}

export default function ColumnCategory({ title, items }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-highlightedText font-black">{title}</h2>
        <ArrowRight size={12} color="#EEEEEE" />
      </div>
      <div className="flex flex-col gap-4 mt-4 ml-2">
        {items.map((item, index) => (
          <GameItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

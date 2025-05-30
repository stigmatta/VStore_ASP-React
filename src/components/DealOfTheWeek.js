import DiscountPrice from "./DiscountPrice";
import GameTitle from "./GameTitle";
import useGetImage from "../hooks/useGetImage";

export default function DealOfTheWeek({ item, onClick }) {
  const gameImage = useGetImage(item?.logoLink);
  return (
    <div onClick={() => onClick?.(item?.id)} className="flex flex-col  gap-7ы">
      <div className="w-full relative overflow-hidden rounded-xl">
        <img
          className="hover:cursor-pointer"
          src={gameImage}
          alt="deal-of-the-week-img"
        />
        <span className="absolute flex justify-center items-center h-8 -left-2 w-[105%] bottom-0 bg-green-gradient text-center font-bold">
          Deal of the week
        </span>
      </div>
      <GameTitle title={item.title}></GameTitle>
      <DiscountPrice
        price={item.price}
        discount={item.discount}
        direction="row"
      />
    </div>
  );
}

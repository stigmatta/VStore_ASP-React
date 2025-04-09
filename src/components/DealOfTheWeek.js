import DiscountPrice from './DiscountPrice';
import GameTitle from './GameTitle';

export default function DealOfTheWeek({ item }) {
  return (
    <div className="flex flex-col w-[369px] gap-7">
      <div className="w-full relative overflow-hidden rounded-xl">
        <img src={item.image} alt="deal-of-the-week-img" />
        <span
          className="absolute flex justify-center items-center h-8 -left-2 w-[105%] bottom-0 bg-green-gradient text-center font-bold">Deal of the week</span>
      </div>
      <GameTitle title={item.title}></GameTitle>
      <DiscountPrice price={item.price} discount={item.discount} direction="row" />
    </div>
  );
}
import DiscountPrice from "./DiscountPrice";
import GameTitle from './GameTitle'

export default function DealOfTheWeek({game}) {
    return (
        <div className="flex flex-col w-[369px] gap-7">
            <div className="w-full relative overflow-hidden rounded-xl">
                <img src={game.image} alt="deal-of-the-week-img" />
                <span className="absolute flex justify-center items-center h-8 -left-2 w-[105%] bottom-0 bg-green-gradient text-center font-bold">Deal of the week</span>
            </div>
            <GameTitle title={game.title}></GameTitle>
            <DiscountPrice price={game.price} discount={game.discount} direction="row" />
        </div>
    )
}
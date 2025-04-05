import DiscountPrice from './DiscountPrice'

export default function SliderOneGame({ game }) {
  return (
        <div className="flex flex-col w-[177px] max-w-[177px] cursor-grab">
            <div className="h-[236px]">
                <img className="w-full" src={game.image} alt="game-image" />
            </div>
            <h3 className="opacity-70">Base Game</h3>
            <h2>{game.title}</h2>
            <DiscountPrice price={game.price} discount={game.discount} direction="col"/>
        </div>
    );
}

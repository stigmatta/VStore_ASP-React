import DiscountPrice from './DiscountPrice';

export default function SliderOneGame({ item }) {
  return (
    <div className="flex flex-col w-[177px] max-w-[177px] cursor-grab">
      <div className="h-[236px]">
        <img className="w-full" src={item.image} alt="game-image" />
      </div>
      <h3 className="opacity-70">Base Game</h3>
      <h2>{item.title}</h2>
      <DiscountPrice price={item.price} discount={item.discount} direction="col" />
    </div>
  );
}

import DiscountPrice from "./DiscountPrice";
import useGetImage from "../hooks/useGetImage";

export default function SliderOneGame({ item }) {
  const gameImage = useGetImage(item?.logoLink);
  return (
    <div className="flex flex-col w-[250px] max-w-[250px] cursor-grab">
      <img className="w-full" src={gameImage} alt="game-image" />
      <h3 className="opacity-70">Base Game</h3>
      <h2 className="mb-3">{item.title}</h2>
      <DiscountPrice
        price={item.price}
        discount={item.discount}
        direction="row"
      />
    </div>
  );
}

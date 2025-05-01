import DiscountPrice from "./DiscountPrice";
import useGetImage from "../hooks/useGetImage";

export default function SliderOneGame({ item }) {
  const gameImage = useGetImage(item?.logoLink);
  const releaseDate = new Date(item?.releaseDate);
  const isNow = Date.now() >= releaseDate;
  return (
    <div className="flex flex-col  cursor-grab">
      <img className="w-full" src={gameImage} alt="game-image" />
      <h3 className="opacity-70">Base Game</h3>
      <h2 className="mb-3">{item.title}</h2>
      {isNow ? (
        <DiscountPrice
          price={item.price}
          discount={item.discount}
          direction="row"
        />
      ) : (
        <span className="opacity-50">SOON</span>
      )}
    </div>
  );
}

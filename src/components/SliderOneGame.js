import DiscountPrice from "./DiscountPrice";
import useGetImage from "../hooks/useGetImage";

export default function SliderOneGame({ item, onClick }) {
  const gameImage = useGetImage(item?.logoLink);
  const releaseDate = new Date(item?.releaseDate);
  const isNow = Date.now() >= releaseDate;

  return (
    <div
      onClick={() => onClick?.(item?.id)}
      className="flex flex-col cursor-pointer hover:scale-[1.02] transition-transform"
    >
      <img className="w-full" src={gameImage} alt="game-image" />
      <h3 className="opacity-70">Base Game</h3>
      <h2 className="mb-3 truncate">{item.title}</h2>
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

export default function DiscountPrice({ price, discount, direction }) {
  const gamePrice = price > 0 ? `${price.toFixed(2)} $` : "Free";
  return (
    <div
      className={`w-full flex flex-row items-center ${direction === "row" ? "gap-2.5" : "justify-between"}`}
    >
      {discount != null && discount !== 0 ? (
        <>
          <span className="text-gray font-normal bg-green rounded-3xl w-fit h-fit flex justify-center items-center px-2 py-0.5">
            -{discount}%
          </span>
        </>
      ) : (
        <></>
      )}
      {discount != null && discount !== 0 ? (
        <div
          className={`flex w-fit ${direction === "row" ? "flex-row gap-2.5" : "flex-col"}`}
        >
          <span className="line-through opacity-70 font-semibold">
            {gamePrice}
          </span>
          <span>{(price * (1 - discount / 100)).toFixed(2)}$</span>
        </div>
      ) : (
        <span>{gamePrice}</span>
      )}
    </div>
  );
}

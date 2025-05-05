export default function DiscountPrice({
  price,
  discount,
  direction,
  textAlign,
}) {
  const gamePrice = price > 0 ? `${price.toFixed(2)} $` : "Free";
  const discountedPrice = (price * (1 - discount / 100)).toFixed(2);

  return (
    <div
      className={`flex ${textAlign === true ? "text-right justify-end" : ""} $ ${direction === "row" ? "flex-row items-baseline gap-2.5" : "flex-col"} min-w-[120px]`}
    >
      {discount != null && discount !== 0 && (
        <div className="text-gray font-normal mb-1 bg-green rounded-3xl w-fit h-fit flex items-center px-2 py-0.5">
          -{discount}%
        </div>
      )}

      {discount != null && discount !== 0 ? (
        <div
          className={`flex ${direction === "row" ? "flex-row gap-2.5 items-baseline" : "flex-col"}`}
        >
          <span className="line-through opacity-70 font-semibold">
            {gamePrice}
          </span>
          <span className="font-bold">{discountedPrice}$</span>
        </div>
      ) : (
        <span className="font-bold">{gamePrice}</span>
      )}
    </div>
  );
}

import GameTitle from "./GameTitle";
import ActionGrayButton from "./ActionGrayButton";
import GreenButton from "./GreenButton";
import useGetImage from "../hooks/useGetImage";
import DiscountPrice from "./DiscountPrice";
import axios from "axios";

export default function ListGame({ game, isCart, onRemoveSuccess, onClick }) {
  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:7192/api/wishlist/${game.id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        onRemoveSuccess(game.id);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const logo = useGetImage(game.logoLink);
  const formattedDate = new Date(game.releaseDate).toLocaleDateString("en-GB");
  return (
    <div className="flex flex-col gap-4 lg:flex-row rounded-md h-fit bg-gray-light p-5 w-full lg:max-h-[200px]">
      <div className="flex flex-1">
        <img
          className="w-full lg:min-h-[150px] lg:min-w-[300px]"
          src={logo}
          alt="game"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col w-full lg:w-3/4">
        <div className="flex flex-row justify-between">
          <div className="rounded bg-gray-lighterInput text-subtext font-normal p-1 w-fit">
            Base Game
          </div>
          <DiscountPrice
            price={game.price}
            discount={game.discount}
            direction={"row"}
            textAlign={true}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-52">
            <GameTitle title={game.title} />
            <div className="flex flex-col gap-[11px]">
              <div className="flex flex-row justify-between">
                <span>All reviews</span>
                <span className="text-green">Mostly positive</span>
              </div>

              <div className="flex flex-row justify-between">
                <span>Release date</span>
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className="flex flex-row gap-3 items-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.213628 2.04187L5.65568 1.29237V6.54999H0.212891L0.213628 2.04187ZM0.213628 11.663L5.65568 12.4133V7.21983H0.212891L0.213628 11.663ZM6.25396 12.4929L13.4923 13.4918V7.21983H6.25396V12.4929ZM6.25396 1.21196V6.54999H13.4923V0.213104L6.25396 1.21196Z"
                  fill="#EEEEEE"
                />
              </svg>

              <svg
                width="16"
                height="9"
                viewBox="0 0 16 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8932 8.72542H12.5735C11.9632 8.72542 11.4669 8.22913 11.4669 7.61887V2.08608C11.4669 1.47581 11.9632 0.979523 12.5735 0.979523H15.8932V2.08608H12.5735V7.61887H15.8932V8.72542ZM9.25383 0.979523H7.04071C6.43045 0.979523 5.93415 1.47581 5.93415 2.08608V8.72542H7.04071V5.95903H9.25383V8.72542H10.3604V2.08608C10.3604 1.47581 9.86409 0.979523 9.25383 0.979523ZM7.04071 4.85247V2.08608H9.25383V4.85247H7.04071ZM3.72104 0.979523L2.88282 3.74592L2.61448 4.83975L2.35721 3.74592L1.50792 0.979523H0.401367V8.72542H1.50792V4.29919L1.41995 3.19485L1.74085 4.29919L2.61448 6.85866L3.48811 4.29919L3.80901 3.19264L3.72104 4.29919V8.72542H4.8276V0.979523H3.72104Z"
                  fill="#EEEEEE"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-6 self-end">
            <ActionGrayButton title="Remove" onClick={handleRemove} />
            {isCart ? (
              <div className="w-fit l:w-16 xl:w-fit">
                <ActionGrayButton title="Move to wishlist" />
              </div>
            ) : (
              <GreenButton width="112px" height="39px" text="Add to cart" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

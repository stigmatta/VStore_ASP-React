import GameTitle from "./GameTitle";
import useGetImage from "../hooks/useGetImage";

const formatDate = (dateInput) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) throw new Error("Invalid date input");

  const month = months[date.getMonth()];
  const day = date.getDate();

  if (date.getHours() === 0 && date.getMinutes() === 0) {
    return `${month} ${day}`;
  }

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours || 12;

  return `${month} ${day} at ${hours}:${minutes} ${ampm}`;
};

export default function FreeGame({ item }) {
  const releaseDate = new Date(item?.releaseDate);
  const gameImage = useGetImage(item?.logoLink);
  const isNow = Date.now() >= releaseDate;
  let dateString = isNow ? "Free Now" : "Free Soon";

  dateString += ` - ${formatDate(releaseDate)}`;
  return (
    <div className="flex flex-col">
      <div className="relative w-full overflow-hidden rounded-xl">
        <img src={gameImage} alt="game image" />
        <span
          className={`absolute flex justify-center items-center h-8 -left-2 w-[105%] bottom-0 text-center font-bold 
                ${isNow ? "bg-green-gradient" : "bg-gray-light"}`}
        >
          {isNow ? "FREE NOW" : "FREE SOON"}
        </span>
      </div>
      <div className="mt-4 mb-4 flex flex-col gap-2 flg:mb-0">
        <GameTitle title={item.title}></GameTitle>
        <span className="font-normal opacity-70">{dateString}</span>
      </div>
    </div>
  );
}

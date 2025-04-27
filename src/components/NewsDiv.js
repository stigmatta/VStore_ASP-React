export default function NewsDiv({ news, isBig = false }) {
  const dateStr = daysAgo(new Date(news.publishedDate));

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.jpg";
    return path.startsWith("http") ? path : `https://localhost:7192${path}`;
  };

  return (
    <div
      className={`${isBig ? "flex flex-col  w-full" : "flex flex-row  gap-4 w-full mx-auto"}`}
    >
      <div className={`relative ${isBig ? "w-full" : "w-full"}`}>
        <img
          src={getImageUrl(news.photo)}
          className={`w-full h-[226px] imd:h-[315px] max-w-[562px] object-cover rounded-xl ${
            isBig ? "object-center" : "object-center"
          }`}
          alt={news.title || "News image"}
        />
      </div>
      <div
        className={`flex flex-col mr-auto ${!isBig ? "w-full xl:w-[369px]" : ""}`}
      >
        <span className="text-bigButton font-bold mt-5 w-fit self-start">
          {dateStr}
        </span>
        <h3 className="text-highlightedText font-bold mt-3 w-full">
          {news.title}
        </h3>
      </div>
    </div>
  );
}

function daysAgo(date) {
  if (!(date instanceof Date)) date = new Date(date);
  const timeDiff = Date.now() - date.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  switch (daysDiff) {
    case 0:
      return "Today";
    case 1:
      return "Yesterday";
    default:
      return `${daysDiff} days ago`;
  }
}

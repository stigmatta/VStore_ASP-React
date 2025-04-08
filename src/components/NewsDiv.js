import BreakLine from "./BreakLine";

export default function NewsDiv({news,isBig = false}) {
    const dateStr = daysAgo(news.date);
    return(
        <div className={`${isBig ? "flex flex-col items-center  w-[562px]" : "flex flex-row items-start gap-4 w-full mx-auto"}`}>
            <img src={news.image} className={`${isBig ? "w-full": "w-[124px] imd:w-[171px]"} h-[226px] imd:h-[315px] max-w-[562px] object-cover object-center rounded-xl`} alt={news.text}/>
            <div className={`flex flex-col ${!isBig ? "w-full xl:w-[369px]" : ""}`}>
                <span className="text-bigButton font-bold mt-5 mb-7 w-fit self-start">{dateStr}</span>
                <span className="text-highlightedText font-bold w-full">{news.text}</span>
            </div>
        </div>
    )
}
function daysAgo(date) {
    const timeDiff = new Date() - date;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (daysDiff === 0)
        return "Today";
    else if (daysDiff === 1)
        return "1 day ago";
    else
        return `${daysDiff} days ago`;
}


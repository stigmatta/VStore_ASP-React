export default function DiscountPrice({price,discount,direction}) {
    return(
        <div className={`w-full flex flex-row items-center ${direction ==="row"? "gap-2.5":"justify-between"}`}>
           {discount != null ? (
                <>
                    <span className="text-gray font-normal bg-green rounded-3xl w-fit h-fit flex justify-center items-center px-2 py-0.5">-{discount}%</span>
                </>
            ) : (<></>)}
            {discount != null ? (
                <div className={`flex w-fit ${direction === "row" ? "flex-row gap-2.5" : "flex-col"}`}>
                    <span className="line-through opacity-70 font-semibold">UAH {price}</span>
                    <span>
                        UAH {Math.round(price * (1 - discount / 100))}
                    </span>
                </div>

            ):(
                <span>UAH {price}</span>
                )
            }
        </div>
    )
}
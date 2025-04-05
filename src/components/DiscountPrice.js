export default function DiscountPrice({price,discount,direction}) {
    return(
        <>
           {discount != null ? (
                <>
                    <span className="text-gray font-normal bg-green rounded-3xl px-2 py-0.5">-{discount}%</span>
                </>
            ) : (<></>)}
            {discount != null ? (
                <div className={direction === "row" ? "flex flex-row ml-auto" : "flex flex-col ml-auto"}>
                    <span className="line-through opacity-70 font-semibold">UAH {price}</span>
                    <span>
                        UAH {Math.round(price * (1 - discount / 100))}
                    </span>
                </div>

            ):(
                <span>UAH {price}</span>
                )
            }
        </>

    )
}
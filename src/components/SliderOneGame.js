export default function SliderOneGame({ title, image, price, discount }) {
    return (
        <div className="flex flex-col w-[177px] max-w-[177px] cursor-grab">
            <div className="h-[236px]">
                <img className="w-full" src={image} alt="game-image" />
            </div>
            <h3 className="opacity-70">Base Game</h3>
            <h2>{title}</h2>

            <div className="flex flex-row mt-[14px] items-center gap-2">
                {discount != null ? (
                    <>
                        <span className="text-gray font-normal bg-green rounded-3xl px-2 py-0.5">-{discount}%</span>
                    </>
                ) : (<></>)}
                {discount != null ? (
                    <div className="flex flex-col ml-auto">
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
        </div>
    );
}

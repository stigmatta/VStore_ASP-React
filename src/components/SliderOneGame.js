export default function SliderOneGame({title,image,price,discount}){
    return(
        <div className="flex flex-col w-[177px] max-w-[177px] cursor-grab">
            <div className="h-[236px]">
                <img className="w-full" src={image} alt="game-image"/>
            </div>
            <h3 className="opacity-70">Base Game</h3>
            <h2>{title}</h2>
            <div className="flex flex-row mt-[14px]">
                <span>UAH {price}</span>
            </div>
        </div>
    )
}
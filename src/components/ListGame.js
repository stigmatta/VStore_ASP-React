import GameTitle from "./GameTitle";
import ActionGrayButton from "./ActionGrayButton";
import GreenButton from "./GreenButton";

export default function ListGame({game,isCart}){
    const formattedDate = game.date.toLocaleDateString('en-GB');
    return (
        <div className="flex flex-row rounded-md h-fit bg-gray-light p-5 w-full lg:max-h-[200px]">
            <img className="w-[125px] h-[166px]" src={game.image} alt="game" />
            <div className="flex flex-1 justify-between ml-6 flex-col lg:flex-row">
                <div className="flex flex-col items-left w-52 max-w-[255px] lg:w-64">
                    <div className="rounded bg-gray-lighterInput text-subtext font-normal p-1 w-fit">Base Game</div>
                    <div className="flex flex-col justify-between h-full">
                        <GameTitle title={game.title}/>
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
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.213628 2.04187L5.65568 1.29237V6.54999H0.212891L0.213628 2.04187ZM0.213628 11.663L5.65568 12.4133V7.21983H0.212891L0.213628 11.663ZM6.25396 12.4929L13.4923 13.4918V7.21983H6.25396V12.4929ZM6.25396 1.21196V6.54999H13.4923V0.213104L6.25396 1.21196Z" fill="#EEEEEE"/>
                                </svg>

                                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8932 8.72542H12.5735C11.9632 8.72542 11.4669 8.22913 11.4669 7.61887V2.08608C11.4669 1.47581 11.9632 0.979523 12.5735 0.979523H15.8932V2.08608H12.5735V7.61887H15.8932V8.72542ZM9.25383 0.979523H7.04071C6.43045 0.979523 5.93415 1.47581 5.93415 2.08608V8.72542H7.04071V5.95903H9.25383V8.72542H10.3604V2.08608C10.3604 1.47581 9.86409 0.979523 9.25383 0.979523ZM7.04071 4.85247V2.08608H9.25383V4.85247H7.04071ZM3.72104 0.979523L2.88282 3.74592L2.61448 4.83975L2.35721 3.74592L1.50792 0.979523H0.401367V8.72542H1.50792V4.29919L1.41995 3.19485L1.74085 4.29919L2.61448 6.85866L3.48811 4.29919L3.80901 3.19264L3.72104 4.29919V8.72542H4.8276V0.979523H3.72104Z" fill="#EEEEEE"/>
                                </svg>
                            </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between w-fit mt-5 gap-14 self-end lg:gap-0 lg:mt-0 lg:self-auto">
                    <span className="self-end font-black">UAH {game.price.toFixed(2)}</span>
                    <div className="flex flex-row justify-between items-center gap-8">
                        <ActionGrayButton title="Remove"/>
                        {isCart?
                            (
                                <ActionGrayButton title="Move to wishlist"/>
                            ):
                            (
                                <GreenButton width="112px" height="39px" text="Add to cart"/>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
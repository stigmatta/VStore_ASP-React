import MainGame from "../components/MainGame";
import CategoryTitle from "../components/CategoryTitle";
import DealOfTheWeek from "../components/DealOfTheWeek";


import TheEndOfTheSun from "../images/the-end-of-the-sun.png"
import CowboyBebop from '../images/cowboy.png'
import TMNT from "../images/deal-of-the-week.png"
import CustomSlider from "../components/CustomSlider";
import SeeInShopGame from "../components/SeeInShopGame";
import SliderOneGame from "../components/SliderOneGame";





export default function MainPage() {
    const gamesArr = Array(6).fill({
      title: "The End of the Sun",
      image: TheEndOfTheSun,
      price: 515,
    });

    const withDiscount = Array(6).fill({
        title: "The End of the Sun",
        image: TheEndOfTheSun,
        price: 515,
        discount:60,
    })

    const seeInShopArr = Array(3).fill({
        title:"Fortnite",
        image:CowboyBebop,
        description:"BANG! Take your shot with bounty hunters Spike Spiegel and Faye Valentine from COWBOY BEBOP.",
    })

    const dealOfTheWeekArr = Array(3).fill({
        title:"Teenage Mutant Ninja Turtles: Splintered Fate",
        image:TMNT,
        price: 515,
        discount:60,
    })

    return (
        <div className="flex flex-col gap-[70px]">
            <MainGame title="APEX LEGENDS" subTitle="NEW SEASON" />

            <div>
                <CategoryTitle title="Discover something new"/>
                <CustomSlider games = {gamesArr} componentName="SliderOneGame" />
            </div>

            <CustomSlider games={seeInShopArr} componentName="SeeInShopGame" />
            <div>
                <CategoryTitle title="Winter Sale Spotlight"/>
                <CustomSlider games={withDiscount} componentName="SliderOneGame"/>
            </div>

            <CustomSlider games={dealOfTheWeekArr} componentName="DealOfTheWeek" />
            <div>
                <CategoryTitle title="Popular Games"/>
                <CustomSlider games = {gamesArr} componentName="SliderOneGame"/>
            </div>

            <div>
                <CategoryTitle title="Recently Updated"/>
                <CustomSlider games = {gamesArr} componentName="SliderOneGame"/>
            </div>
            <div>
                <CategoryTitle title="Now on the store"/>
                <CustomSlider games = {gamesArr} componentName="SliderOneGame"/>
            </div>

        </div>
    )
}
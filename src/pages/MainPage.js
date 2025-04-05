import MainGame from "../components/MainGame";
import TheEndOfTheSun from "../images/the-end-of-the-sun.png"
import CowboyBebop from '../images/cowboy.png'
import CategoryTitle from "../components/CategoryTitle";
import SliderGames from "../components/SliderGames";
import SeeInShopSlider from "../components/SeeInShopSlider";



export default function MainPage() {
    const gamesArr = Array(6).fill({
      title: "The End of the Sun",
      image: TheEndOfTheSun,
      price: 515,
    });

    const seeInShopArr = Array(3).fill({
        title:"Fortnite",
        image:CowboyBebop,
        description:"BANG! Take your shot with bounty hunters Spike Spiegel and Faye Valentine from COWBOY BEBOP.",
    });

    return (
        <div>
            <MainGame title="APEX LEGENDS" subTitle="NEW SEASON" />

            <CategoryTitle title="Discover something new"/>
            <SliderGames games = {gamesArr}/>
            <SeeInShopSlider games={seeInShopArr}/>

            <CategoryTitle title="Popular Games"/>
            <SliderGames games = {gamesArr}/>

            <CategoryTitle title="Recently Updated"/>
            <SliderGames games = {gamesArr}/>

            <CategoryTitle title="Now on the store"/>
            <SliderGames games = {gamesArr}/>

        </div>
    )
}
import MainGame from "../components/MainGame";
import TheEndOfTheSun from "../images/the-end-of-the-sun.png"
import CategoryTitle from "../components/CategoryTitle";
import SliderGames from "../components/SliderGames";

export default function MainPage() {
    const gamesArr = Array(6).fill({
      title: "The End of the Sun",
      image: TheEndOfTheSun,
      price: 515,
    });
    return (
        <div>
            <MainGame title="APEX LEGENDS" subTitle="NEW SEASON" />

            <CategoryTitle title="Discover something new"/>
            <SliderGames games = {gamesArr}/>

            <CategoryTitle title="Popular Games"/>
            <SliderGames games = {gamesArr}/>

            <CategoryTitle title="Recently Updated"/>
            <SliderGames games = {gamesArr}/>

            <CategoryTitle title="Now on the store"/>
            <SliderGames games = {gamesArr}/>
        </div>
    )
}
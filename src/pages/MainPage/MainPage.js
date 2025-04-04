import MainGame from "../../components/MainGame";
import SliderOneGame from "../../components/SliderOneGame";
import TheEndOfTheSun from "../../images/the-end-of-the-sun.png"
import CategoryTitle from "../../components/CategoryTitle";
import SliderGames from "../../components/SliderGames";

export default function MainPage() {
    const discoverNew = Array(6).fill({
      title: "The End of the Sun",
      image: TheEndOfTheSun,
      price: 515,
    });
    return (
        <div>
            <MainGame title="APEX LEGENDS" subTitle="NEW SEASON" />
            <CategoryTitle title="Discover something new"/>
            <SliderGames games = {discoverNew}/>
        </div>
    )
}
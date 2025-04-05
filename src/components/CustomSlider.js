import Slider from "react-slick";
import SliderOneGame from "../components/SliderOneGame";
import SeeInShopGame from "../components/SeeInShopGame";
import DealOfTheWeek from "./DealOfTheWeek";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const componentMap = {
  "SliderOneGame": SliderOneGame,
  "SeeInShopGame": SeeInShopGame,
  "DealOfTheWeek": DealOfTheWeek,
};

export default function CustomSlider({ componentName, games }) {
  const Component = componentMap[componentName];

  if(!games){
    return <div>Games is null</div>
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: games.length??0,
    slidesToScroll: Math.min(games.length / 3, 1),
    adaptiveHeight: true,
    arrows: false,
  };

  return (
    <div className="overflow-x-hidden scrollbar-hide">
      <Slider {...settings}>
        {games.map((game, index) => (
          <div key={index}>
            <Component game={game} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

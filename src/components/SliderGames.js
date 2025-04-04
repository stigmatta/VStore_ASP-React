import SliderOneGame from "./SliderOneGame";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SliderGames.css';

export default function SliderGames({ games }) {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        adaptiveHeight: true,
        focusOnSelect: false,
        arrows: false,
    };

  return (
      <Slider {...settings}>
        {games.map((game, index) => (
          <div key={index} className="flex-none">
            <SliderOneGame
              title={game.title}
              image={game.image}
              price={game.price}
              discount={game.discount}
            />
          </div>
        ))}
      </Slider>
  );
}

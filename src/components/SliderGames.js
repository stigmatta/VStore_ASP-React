import SliderOneGame from "./SliderOneGame";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderGames({ games }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    adaptiveHeight: true,
    arrows: false,
  };

  return (
    <div className="overflow-x-hidden">
      {/* Injected compiled Tailwind CSS style (instead of @apply) */}
      <style>
        {`
          .slick-slider, .slick-list {
            min-width: 1130px;
          }
        `}
      </style>

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
    </div>
  );
}

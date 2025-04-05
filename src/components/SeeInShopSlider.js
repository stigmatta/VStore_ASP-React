import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SeeInShopGame from "./SeeInShopGame";

export default function SeeInShopSlider({ games }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
  };

  return (
    <div className="overflow-x-hidden">

      <Slider {...settings}>
        {games.map((game, index) => (
          <div key={index} className="flex-none">
            <SeeInShopGame
              title={game.title}
              description={game.description}
              image={game.image}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

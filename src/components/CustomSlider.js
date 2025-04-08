import Slider from "react-slick";
import SliderOneGame from "../components/SliderOneGame";
import SeeInShopGame from "../components/SeeInShopGame";
import DealOfTheWeek from "./DealOfTheWeek";
import FreeGame from "./FreeGame";
import NewsDiv from "./NewsDiv";


import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const componentMap = {
  "SliderOneGame": SliderOneGame,
  "SeeInShopGame": SeeInShopGame,
  "DealOfTheWeek": DealOfTheWeek,
  "FreeGame": FreeGame,
  "MainNews": NewsDiv,
};

export default function CustomSlider({ componentName, games, children }) {
  const Component = componentMap[componentName];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: children ? React.Children.count(children) : (games?.length ?? 0),
    slidesToScroll: children ? React.Children.count(children) / 3 : (games?.length ?? 0) / 3,
    adaptiveHeight: true,
    arrows: false,
  };

  return (
    <div className="overflow-x-hidden scrollbar-hide">
      <Slider {...settings}>
        {children
          ? React.Children.map(children, (child, index) => (
              <div key={index}>{child}</div>
            ))
          : games.map((game, index) => (
              <div key={index}>
                <Component game={game} />
              </div>
            ))}
      </Slider>
    </div>
  );
}

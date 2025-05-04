import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import SliderOneGame from "./SliderOneGame";
import SeeInShopGame from "./SeeInShopGame";
import DealOfTheWeek from "./DealOfTheWeek";
import FreeGame from "./FreeGame";
import NewsDiv from "./NewsDiv";
import { AchievementForSlider } from "./AchievementForSlider";

const componentMap = {
  SliderOneGame: SliderOneGame,
  SeeInShopGame: SeeInShopGame,
  DealOfTheWeek: DealOfTheWeek,
  FreeGame: FreeGame,
  MainNews: NewsDiv,
  AchievementForSlider: AchievementForSlider,
};

export default function CustomSlider({
  componentName,
  items = [],
  children,
  visibleSlides = 4,
  slidesToScroll = 1,
  onClick,
}) {
  const Component = componentMap[componentName];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(
      visibleSlides,
      children
        ? React.Children.count(children)
        : items?.length || visibleSlides,
    ),
    slidesToScroll: Math.min(
      slidesToScroll,
      children
        ? Math.ceil(React.Children.count(children) / 2)
        : Math.ceil(items?.length / 2) || slidesToScroll,
    ),
    adaptiveHeight: false,
    centerMode: false,
    variableWidth: false,
    arrows: false,
  };

  return (
    <div className="overflow-x-hidden scrollbar-hide custom-slider">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Slider {...settings} className="max-w-[1130px]">
          {children
            ? React.Children.map(children, (child, index) => (
                <div key={index} className="px-2">
                  {child}
                </div>
              ))
            : items?.map((item, index) => (
                <div key={item.id || index} className="px-2">
                  <Component item={item} onClick={onClick} />
                </div>
              ))}
        </Slider>
      </React.Suspense>
    </div>
  );
}

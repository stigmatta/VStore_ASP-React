import Slider from 'react-slick';
import SliderOneGame from './SliderOneGame';
import SeeInShopGame from './SeeInShopGame';
import { AchievementForSlider } from './AchievementForSlider';

import DealOfTheWeek from './DealOfTheWeek';
import FreeGame from './FreeGame';
import NewsDiv from './NewsDiv';

import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const componentMap = {
  'SliderOneGame': SliderOneGame,
  'SeeInShopGame': SeeInShopGame,
  'DealOfTheWeek': DealOfTheWeek,
  'FreeGame': FreeGame,
  'MainNews': NewsDiv,
  'AchievementForSlider': AchievementForSlider
};

export default function CustomSlider({ componentName, items = [], children }) {
  const Component = componentMap[componentName];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: children ? React.Children.count(children) : items.length,
    slidesToScroll: children ? React.Children.count(children) / 3 : items.length / 3,
    adaptiveHeight: true,
    arrows: false
  };

  return (
    <div className="overflow-x-hidden scrollbar-hide custom-slider">
      <Slider {...settings} className="max-w-[1130px]">
        {children
          ? React.Children.map(children, (child, index) => (
            <div key={index}>{child}</div>
          ))
          : items.map((item, index) => (
            <div key={index}>
              <Component item={item} />
            </div>
          ))}
      </Slider>
    </div>
  );
}

import Slider from "react-slick";
import { useRef, useState } from "react";

function getYouTubeEmbedUrl(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getYouTubeThumbnail(youtubeUrl) {
  const match = youtubeUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function SliderSyncing({ items }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const mainSettings = {
    asNavFor: nav2,
    ref: slider1,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const thumbSettings = {
    asNavFor: nav1,
    ref: slider2,
    slidesToShow: 5,
    swipeToSlide: true,
    centerMode: false,
    arrows: false,
    infinite: true,
    focusOnSelect: true,
  };

  return (
    <div className="slider-syncing">
      <Slider
        {...mainSettings}
        ref={(slider) => setNav1(slider)}
        className="mb-4"
      >
        {items.map((item, index) => {
          if (item.type === "image") {
            return (
              <div key={index}>
                <img
                  src={item.src}
                  alt={`slide-${index}`}
                  className="w-full object-contain"
                />
              </div>
            );
          } else if (item.type === "video") {
            const embedUrl = getYouTubeEmbedUrl(item.src);
            return (
              <div key={index}>
                <iframe
                  className="w-full aspect-video"
                  src={embedUrl}
                  title={`YouTube video ${index}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          } else return null;
        })}
      </Slider>

      <Slider {...thumbSettings} ref={(slider) => setNav2(slider)}>
        {items.map((item, index) => {
          const thumbnail =
            item.type === "video" ? getYouTubeThumbnail(item.src) : item.src;

          return (
            <div key={index} className="px-1">
              <img
                src={thumbnail}
                alt={`thumb-${index}`}
                className="h-[80px] w-full object-cover rounded-md"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

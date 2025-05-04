import Slider from "react-slick";
import { useRef, useState } from "react";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  // Handle both full URLs and shortened youtu.be links
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getYouTubeThumbnail(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function isVideoUrl(url) {
  return (
    url?.includes("youtube.com") ||
    url?.includes("youtu.be") ||
    url?.endsWith(".mp4")
  );
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
    slidesToShow: Math.min(items?.length || 0, 5), // Show up to 5 thumbnails
    swipeToSlide: true,
    centerMode: false,
    arrows: false,
    infinite: true,
    focusOnSelect: true,
  };

  // Filter out any null/undefined items
  const validItems = items?.filter((item) => item) || [];

  return (
    <div className="slider-syncing">
      {/* Main Slider */}
      <Slider
        {...mainSettings}
        ref={(slider) => setNav1(slider)}
        className="mb-4"
      >
        {validItems.map((item, index) => {
          const isVideo = isVideoUrl(item);
          const embedUrl = isVideo ? getYouTubeEmbedUrl(item) : null;

          return (
            <div key={index}>
              {isVideo ? (
                <div className="aspect-video w-full">
                  {embedUrl ? (
                    <iframe
                      className="w-full h-full"
                      src={embedUrl}
                      title={`Game media ${index}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video controls className="w-full h-full">
                      <source src={item} type="video/mp4" />
                    </video>
                  )}
                </div>
              ) : (
                <img
                  src={item}
                  alt={`Game content ${index}`}
                  className="w-full object-contain max-h-[500px]"
                />
              )}
            </div>
          );
        })}
      </Slider>

      {/* Thumbnail Slider */}
      {validItems.length > 1 && (
        <Slider {...thumbSettings} ref={(slider) => setNav2(slider)}>
          {validItems.map((item, index) => {
            const isVideo = isVideoUrl(item);
            const thumbnail = isVideo
              ? getYouTubeThumbnail(item) || item
              : item;

            return (
              <div key={index} className="px-1">
                <div className="relative h-[80px] overflow-hidden rounded-md">
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.8L17 10 6.3 17.2V2.8z" />
                      </svg>
                    </div>
                  )}
                  <img
                    src={thumbnail}
                    alt={`Thumbnail ${index}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}

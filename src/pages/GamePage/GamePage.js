import "./GamePage.css";

import PageTitle from "../../components/PageTitle";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import AchievementImage from "../../images/achievement.png";
import useWindowWidth from "../../hooks/useWindowWidth";
import CustomPagination from "../../components/CustomPagination";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetImage from "../../hooks/useGetImage";
import SliderSyncing from "../../components/SliderSyncing";
import GameSectionTitle from "../../components/GameSectionTitle";
import axios from "axios";
import GreenButton from "../../components/GreenButton";
import GrayButton from "../../components/GrayButton";
import CustomSlider from "../../components/CustomSlider";
import ShowMoreGreen from "../../components/ShowMoreGreen";
import Select from "../../components/Select";
import ReviewInput from "../../components/ReviewInput";
import Review from "../../components/Review";
import Pegi from "../../components/Pegi";
import useGetImages from "../../hooks/useGetImages";
import useScrollToTop from "../../hooks/useScrollToTop";
import CustomLoader from "../../components/CustomLoader";
import CustomSnackbar from "../../components/CustomSnackbar";
import { addToCart } from "../../utils/addToCart";
import { addToWishlist } from "../../utils/addToWishlist";
import useSnackbar from "../../hooks/useSnackbar";

const strAndColor = {
  Mixed: "text-yellow-400",
  Neutral: "text-gray-lighter",
  "Overwhelmingly Positive": "text-green",
  "Very Positive": "text-green",
  "Mostly Positive": "text-green",
  "Mostly Negative": "text-red",
  "Overwhelmingly Negative": "text-red",
};

const sortOptions = [
  { label: "None", value: "" },
  { label: "Recent", value: "top" },
  { label: "Popular", value: "sale" },
];

function reviewByPercent(percent) {
  if (percent == null)
    return { text: "Neutral", color: strAndColor["Neutral"] };
  if (percent >= 95)
    return {
      text: "Overwhelmingly Positive",
      color: strAndColor["Overwhelmingly Positive"],
    };
  if (percent >= 80)
    return { text: "Very Positive", color: strAndColor["Very Positive"] };
  if (percent >= 70)
    return { text: "Mostly Positive", color: strAndColor["Mostly Positive"] };
  if (percent >= 40) return { text: "Mixed", color: strAndColor["Mixed"] };
  if (percent >= 20)
    return { text: "Mostly Negative", color: strAndColor["Mostly Negative"] };

  return {
    text: "Overwhelmingly Negative",
    color: strAndColor["Overwhelmingly Negative"],
  };
}

export default function GamePage() {
  const { openSnackbar, isSuccess, snackMessage, createSnackbar, handleClose } =
    useSnackbar();
  useScrollToTop();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { state } = useLocation();
  const game = state.game;
  const [userId, setUserId] = useState(null);
  const [minimum, setMinimum] = useState({});
  const [recommended, setRecommended] = useState({});
  const releaseDate = new Date(game?.releaseDate).toLocaleDateString("en-gb");
  const logo = useGetImage(game?.logoLink);
  const galleryImages = useGetImages(game?.gallery || []);
  const media = [game?.trailerLink, ...galleryImages].filter(Boolean);
  const percent = 93;
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    const { success, message } = addToCart({ game, userId, navigate });
    createSnackbar(success, message);
  };

  const handleAddToWishlist = async () => {
    const { success, message } = await addToWishlist({
      game,
      userId,
      navigate,
    });
    createSnackbar(success, message);
  };

  const handleReviewPost = () => {
    if (userId == null) navigate("/login");
    else console.log("success");
  };

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axios.post(
          "https://localhost:7192/api/game/get-info/",
          { id: id },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const { minimum, recommended, userId } = response.data;
        setMinimum(minimum);
        setRecommended(recommended);
        setUserId(userId);
      } catch (error) {
        console.error("Failed to fetch requirements:", {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequirements();
  }, [id]);

  const achievements = Array(6).fill({
    image: AchievementImage,
    title: "Professional newbies",
    description: "Complete the games at the easiest difficulty",
    percent: 35,
  });

  const reviews = [
    {
      isLiked: true,
      user: "dimabalawov",
      date: new Date("2025-02-27T17:00:00"),
      text: "It's a shame this games has gotten the hate it has. It's actually pretty awesome.",
    },
    {
      isLiked: false,
      user: "johnDoe123",
      date: new Date("2025-03-12T14:30:00"),
      text: "Love the games! The world is huge, and the quests are engaging. Though the combat could use more variety, it's overall an enjoyable experience. The side content adds a lot of depth, and the graphics are stunning.",
    },
    {
      isLiked: true,
      user: "gamer456",
      date: new Date("2025-01-05T19:00:00"),
      text: "The story is fantastic, but the gameplay can be a bit tedious at times. The world-building is top-notch, and the lore is rich and detailed. The combat system is solid, but it could use more depth.",
    },
    {
      isLiked: false,
      user: "randomPlayer",
      date: new Date("2025-04-02T10:00:00"),
      text: "Not a fan of the mechanics, but the world-building is phenomenal.",
    },
    {
      isLiked: true,
      user: "elite_gamer",
      date: new Date("2025-03-20T22:00:00"),
      text:
        "I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting." +
        " The open-world aspect is great, but the games could use more variety in enemies.I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting." +
        " The open-world aspect is great, but the games could use more variety in enemies.I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting." +
        " The open-world aspect is great, but the games could use more variety in enemies.I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting." +
        " The open-world aspect is great, but the games could use more variety in enemies.I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting." +
        " The open-world aspect is great, but the games could use more variety in enemies.",
    },
    {
      isLiked: false,
      user: "gamer456",
      date: new Date("2025-02-25T11:00:00"),
      text: "Great games for fans of action RPGs. The loot system is addictive, but the combat can be repetitive.",
    },
    {
      isLiked: true,
      user: "dimabalawov",
      date: new Date("2025-01-17T16:00:00"),
      text:
        "Didn't like it much, but the graphics are amazing. The combat left me wanting more." +
        "Didn't like it much, but the graphics are amazing. The combat left me wanting more." +
        "Didn't like it much, but the graphics are amazing. The combat left me wanting more." +
        "Didn't like it much, but the graphics are amazing. The combat left me wanting more.",
    },
    {
      isLiked: true,
      user: "johnDoe123",
      date: new Date("2025-03-07T13:00:00"),
      text: "An underrated gem! Loved exploring the world and finding hidden secrets. The side quests are some of the best I've ever played, and they often tell more compelling stories than the main quest.",
    },
    {
      isLiked: false,
      user: "randomPlayer",
      date: new Date("2025-02-18T18:00:00"),
      text: "It’s okay. The games has its flaws, but it can be fun at times.",
    },
  ];

  const reviewStrColor = reviewByPercent(percent);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const [sortValue, setSortValue] = React.useState("");

  if (isLoading) return <CustomLoader />;

  return (
    <div>
      <CustomSnackbar
        close={handleClose}
        isError={!isSuccess}
        message={snackMessage}
        open={openSnackbar}
      />
      <PageTitle title={game?.title} />
      <div className="flex flex-col lg:flex-row justify-between gap-6 mt-8">
        <div name="first-col" className="first-col flex flex-col flex-1">
          <SliderSyncing items={media} />
          <GameSectionTitle title="About this game" />
          <p className={`w-[85%] ${!expanded ? "fade-out-bottom" : ""}`}>
            {expanded
              ? game.description + game.description
              : `${(game.description + game.description).slice(0, 300)}...`}
          </p>
          <div onClick={toggleExpand} className="text-green">
            {expanded ? <ShowLessSpan /> : <ShowMoreSpan />}
          </div>
          <GameSectionTitle title="System Requirements" />
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1 max-w-[43%]">
              <span className="font-bold text-bigButton mb-3">Minimum</span>
              <Requirement item={{ category: "OS:", text: minimum.os }} />
              <Requirement
                item={{
                  category: "Processor:",
                  text: minimum.processor,
                }}
              />
              <Requirement
                item={{
                  category: "Memory:",
                  text: minimum.memory,
                }}
              />
              <Requirement
                item={{
                  category: "Graphics:",
                  text: minimum.graphics,
                }}
              />
              <Requirement
                item={{
                  category: "Storage:",
                  text: minimum.storage,
                }}
              />
              <Requirement
                item={{
                  category: "Additional Input Device",
                  text: minimum.device,
                }}
              />
            </div>

            <div className="flex flex-col gap-1 max-w-[43%]">
              <span className="font-bold text-bigButton mb-3 ">
                Recommended
              </span>
              <Requirement
                item={{
                  category: "OS:",
                  text: recommended.os,
                }}
              />
              <Requirement
                item={{
                  category: "Processor:",
                  text: recommended.processor,
                }}
              />
              <Requirement
                item={{
                  category: "Memory:",
                  text: recommended.memory,
                }}
              />
              <Requirement
                item={{
                  category: "Graphics:",
                  text: recommended.graphics,
                }}
              />
              <Requirement
                item={{
                  category: "Storage:",
                  text: recommended.storage,
                }}
              />
              <Requirement
                item={{
                  category: "Additional Input Device",
                  text: recommended.device,
                }}
              />
            </div>
          </div>
        </div>

        <div name="second-col" className="flex flex-col min-w-[400px]">
          <img className="object-contain" src={logo} alt="Game Logo" />
          <p className="text-bigButton font-normal text-left opacity-90 mt-2">
            {game.description}
          </p>
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex justify-between">
              <span className="font-normal opacity-80">All reviews:</span>
              <span className={strAndColor[reviewStrColor.text]}>
                {reviewStrColor.text} ({percent}%)
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="font-normal opacity-80">Release date:</span>
              <div className="text-right">{releaseDate}</div>
            </div>
            <div className="flex justify-between">
              <span className="font-normal opacity-80">Developer:</span>
              <div className="text-right">{game.developer}</div>
            </div>
            <div className="flex justify-between">
              <span className="font-normal opacity-80">Publisher:</span>
              <div className="text-right">{game.publisher}</div>
            </div>
            <div className="flex justify-between h-[47px]">
              <GreenButton
                text="Add to cart"
                width="47%"
                height="100%"
                weight={700}
                onClick={handleAddToCart}
              />
              <GrayButton
                text="Wishlist"
                width="47%"
                height="100%"
                handleClick={handleAddToWishlist}
              />
            </div>
            <Pegi pegiStr={game.pegi} />
          </div>
        </div>
      </div>
      <GameSectionTitle title="Achievements" />
      <CustomSlider items={achievements} componentName="AchievementForSlider" />
      <ShowMoreGreen />

      <GameSectionTitle title="Customer Reviews" />
      <div className="flex flex-col">
        <span className="text-highlightedText font-normal">Review score:</span>
        <span className={`${strAndColor[reviewStrColor.text]} text-title`}>
          {reviewStrColor.text}
        </span>
        <div className="mt-5">
          <Select
            label="Sort by"
            onChange={(e) => setSortValue(e.target.value)}
            value={sortValue}
            items={sortOptions}
          />
        </div>

        <ReviewInput onClick={handleReviewPost} item={game} />
        {windowWidth > 1050 ? (
          <div className="flex gap-x-4 mt-10">
            <div className="flex flex-col gap-y-4 flex-1">
              {reviews
                .filter((_, i) => i % 2 === 0)
                .map((item, index) => (
                  <Review key={index} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-y-4 flex-1">
              {reviews
                .filter((_, i) => i % 2 !== 0)
                .map((item, index) => (
                  <Review key={index} item={item} />
                ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-4">
            {reviews.map((item, index) => (
              <Review key={index} item={item} />
            ))}
          </div>
        )}
      </div>

      <CustomPagination totalItems={1000} />
    </div>
  );
}

function ShowMoreSpan() {
  return (
    <div className="flex flex-row">
      <span className="text-green hover:cursor-pointer">Show more</span>
      <ChevronDown size={24} color="#7bc74d" />
    </div>
  );
}

function ShowLessSpan() {
  return (
    <div className="flex flex-row">
      <span className="text-green hover:cursor-pointer">Show less</span>
      <ChevronUp size={24} color="#7bc74d" />
    </div>
  );
}

function Requirement({ item }) {
  return (
    <div className="flex gap-2 self-start">
      <span className="font-semibold text-text opacity-70">
        {item.category}
      </span>
      <span>{item.text}</span>
    </div>
  );
}

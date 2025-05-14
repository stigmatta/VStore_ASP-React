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
import SoonBadge from "../../components/SoonBadge";
import usePagination from "../../utils/usePagination";

const strAndColor = {
  Mixed: "text-yellow-400",
  Neutral: "text-gray-lighter",
  "Overwhelmingly Positive": "text-green",
  "Very Positive": "text-green",
  "Mostly Positive": "text-green",
  "Mostly Negative": "text-red",
  "Overwhelmingly Negative": "text-red",
};

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
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    const { success, message } = addToCart({ game, userId, navigate });
    createSnackbar(success, message);
  };
  const { page, setPage, totalItems, setTotalItems, itemsPerPage } =
    usePagination(1, 10);
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const { state } = useLocation();
  const game = state?.game;
  const [isLoading, setIsLoading] = useState(true);

  const [minimum, setMinimum] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [recommended, setRecommended] = useState({});
  const releaseDate = new Date(game?.releaseDate).toLocaleDateString("en-gb");
  const isReleased = new Date(game?.releaseDate) < new Date();

  const logo = useGetImage(game?.logoLink);
  const galleryImages = useGetImages(game?.gallery || []);
  const media = [game?.trailerLink, ...galleryImages].filter(Boolean);
  const [percent, setPercent] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [isRated, setIsRated] = useState(false);

  const handleAddToWishlist = async () => {
    const { success, message } = await addToWishlist({
      game,
      userId,
      navigate,
    });
    createSnackbar(success, message);
  };

  const handleReviewPost = async (newReview) => {
    const reviewWithUsername = {
      ...newReview,
      username: user?.username,
    };
    if (userId == null && user == null) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        "https://localhost:7192/api/game/post-review/",
        newReview,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      createSnackbar(true, "Review posted successfully");
      setReviews([...reviews, reviewWithUsername]);
      setPage(1);
      setTotalItems(totalItems + 1);
      setIsRated(true);
    } catch (error) {
      createSnackbar(false, "Failed to post review");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/get-user`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
        });
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axios.post(
          "https://localhost:7192/api/game/get-info/",
          { id: game?.id },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const { minimum, recommended, userId, achievements } = response.data;
        setMinimum(minimum);
        setRecommended(recommended);
        setUserId(userId);
        setAchievements(achievements);
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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/game/${game.id}/reviews?pageNumber=${page}&pageSize=${itemsPerPage}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        setReviews(response.data.items);
        setTotalItems(response.data.totalCount);
        setPercent(response.data.ratingInPercent);
        if (reviews != null && reviews.length > 0) {
          setIsRated(true);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
        });
      }
    };
    fetchReviews();
  }, [game?.id, page, itemsPerPage]);

  const reviewStrColor = reviewByPercent(percent);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

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
              {isRated ? (
                <span className={strAndColor[reviewStrColor.text]}>
                  {reviewStrColor.text} ({percent}%)
                </span>
              ) : (
                <span className="text-gray-lighter">Not rated yet</span>
              )}
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
              {isReleased ? (
                <GreenButton
                  text="Add to cart"
                  width="47%"
                  height="100%"
                  weight={700}
                  onClick={handleAddToCart}
                />
              ) : (
                <div className="m-auto">
                  <SoonBadge size={"1.5em"} />
                </div>
              )}

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
      {achievements.length > 0 && (
        <>
          <GameSectionTitle title="Achievements" />
          <CustomSlider
            items={achievements}
            componentName="AchievementForSlider"
          />
          <ShowMoreGreen isUser={false} id={game.id} items={achievements} />
        </>
      )}

      <GameSectionTitle title="Customer Reviews" />
      <div className="flex flex-col">
        <span className="text-highlightedText font-normal">Review score:</span>
        {isRated ? (
          <span className={`${strAndColor[reviewStrColor.text]} text-title`}>
            {reviewStrColor.text}
          </span>
        ) : (
          <span className="text-gray-lighter text-title">Not rated yet</span>
        )}

        <ReviewInput onSubmit={handleReviewPost} item={game} user={user} />
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
                  <Review key={index} item={item} user={user} />
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

      {totalItems > itemsPerPage && (
        <CustomPagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={(newPage) => setPage(newPage)}
          currentPage={page}
        />
      )}
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

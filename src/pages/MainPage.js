import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import CustomLoader from "../components/CustomLoader";
import CategoryTitle from "../components/CategoryTitle";
import EpicStoreDiv from "../components/EpicStoreDiv";
import ColumnCategory from "../components/ColumnCategory";
import useRedirectToGame from "../hooks/useRedirectToGame";

const MainGame = lazy(() => import("../components/MainGame"));
const CustomSlider = lazy(() => import("../components/CustomSlider"));
const FreeGameDiv = lazy(() => import("../components/FreeGameDiv"));
export default function MainPage() {
  const [mainGame, setMainGame] = useState(null);
  const [discoverNew, setDiscoverNew] = useState([]);
  const [withDiscount, setWithDiscount] = useState([]);
  const [dealOfTheWeek, setDealOfTheWeek] = useState([]);
  const [freeGames, setFreeGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [mostPlayed, setMostPlayed] = useState([]);
  const [topWishlist, setTopWishlist] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [under5Games, setUnder5Games] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("https://localhost:7192/api/main");
        const {
          mainGameWithGallery,
          discoverNew,
          withDiscount,
          dealOfTheWeek,
          freeGames,
          popularGames,
          mostPlayed,
          wishlistGames,
          topSellers,
          under5Games,
          upcoming,
        } = response.data;

        setMainGame(mainGameWithGallery);
        setDiscoverNew(discoverNew);
        setWithDiscount(withDiscount);
        setDealOfTheWeek(dealOfTheWeek);
        setFreeGames(freeGames);
        setPopularGames(popularGames);
        setMostPlayed(mostPlayed);
        setTopWishlist(wishlistGames);
        setTopSellers(topSellers);
        setUnder5Games(under5Games);
        setUpcoming(upcoming);
      } catch (err) {
        console.error("Game data fetch error:", err);
        setError("Failed to load games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);
  const handleGameClick = useRedirectToGame();
  if (isLoading) return <CustomLoader />;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="flex flex-col gap-[70px]">
      <Suspense fallback={<p>Loading...</p>}>
        {<MainGame item={mainGame} onClick={handleGameClick} />}
        <div>
          <CategoryTitle title="Discover something new" />
          <CustomSlider
            items={discoverNew}
            componentName="SliderOneGame"
            visibleSlides={4}
            onClick={handleGameClick}
          />
        </div>
        <div>
          <CategoryTitle title="Sale Spotlight" />
          <CustomSlider
            items={withDiscount}
            componentName="SliderOneGame"
            visibleSlides={4}
            onClick={handleGameClick}
          />
        </div>
        <CustomSlider
          items={discoverNew}
          visibleSlides={3}
          componentName="SeeInShopGame"
          onClick={handleGameClick}
        />
        <CustomSlider
          items={dealOfTheWeek}
          componentName="DealOfTheWeek"
          visibleSlides={3}
          onClick={handleGameClick}
        />
        <FreeGameDiv games={freeGames} onClick={handleGameClick} />
        <EpicStoreDiv />

        <CustomSlider>
          <ColumnCategory
            title="Most Played"
            items={mostPlayed.slice(0, 3)}
            onClick={handleGameClick}
          />
          <ColumnCategory
            title="Top Wishlist"
            items={topWishlist.slice(0, 3)}
            onClick={handleGameClick}
          />
          <ColumnCategory
            title="Top sellers"
            items={topSellers.slice(0, 3)}
            onClick={handleGameClick}
          />
        </CustomSlider>

        <div>
          <CategoryTitle title="Popular Games" />
          <CustomSlider
            items={popularGames}
            componentName="SliderOneGame"
            onClick={handleGameClick}
          />
        </div>

        <div>
          <CategoryTitle title="Under 5$" />
          <CustomSlider
            items={under5Games}
            componentName="SliderOneGame"
            onClick={handleGameClick}
          />
        </div>
        <div>
          <CategoryTitle title="Upcoming Games" />
          <CustomSlider
            items={upcoming}
            componentName="SliderOneGame"
            onClick={handleGameClick}
          />
        </div>
      </Suspense>
    </div>
  );
}

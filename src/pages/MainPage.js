import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import CustomLoader from "../components/CustomLoader";
import CategoryTitle from "../components/CategoryTitle";
import EpicStoreDiv from "../components/EpicStoreDiv";
import ColumnCategory from "../components/ColumnCategory";

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
  const [topWishlist, setTopWishlist] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
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
          wishlistGames,
          topSellers,
          upcoming,
        } = response.data;

        setMainGame(mainGameWithGallery);
        setDiscoverNew(discoverNew);
        setWithDiscount(withDiscount);
        setDealOfTheWeek(dealOfTheWeek);
        setFreeGames(freeGames);
        setPopularGames(popularGames);
        setTopWishlist(wishlistGames);
        setTopSellers(topSellers);
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

  if (isLoading) return <CustomLoader />;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="flex flex-col gap-[70px]">
      <Suspense fallback={<CustomLoader />}>
        {<MainGame item={mainGame} />}
        <div>
          <CategoryTitle title="Discover something new" />
          <CustomSlider
            items={discoverNew}
            componentName="SliderOneGame"
            visibleSlides={4}
          />
        </div>
        <div>
          <CategoryTitle title="Sale Spotlight" />
          <CustomSlider
            items={withDiscount}
            componentName="SliderOneGame"
            visibleSlides={4}
          />
        </div>
        <CustomSlider
          items={discoverNew}
          visibleSlides={3}
          componentName="SeeInShopGame"
        />
        <CustomSlider
          items={dealOfTheWeek}
          componentName="DealOfTheWeek"
          visibleSlides={3}
        />
        <FreeGameDiv games={freeGames} />
        <EpicStoreDiv />

        <CustomSlider>
          <ColumnCategory
            title="Most Played"
            items={popularGames.slice(0, 3)}
          />
          <ColumnCategory
            title="Top Wishlist"
            items={popularGames.slice(3, 6)}
          />
          <ColumnCategory title="Top sellers" items={topSellers} />
        </CustomSlider>

        <div>
          <CategoryTitle title="Popular Games" />
          <CustomSlider items={popularGames} componentName="SliderOneGame" />
        </div>

        <div>
          <CategoryTitle title="Recently Updated" />
          <CustomSlider items={popularGames} componentName="SliderOneGame" />
        </div>
        <div>
          <CategoryTitle title="Upcoming Games" />
          <CustomSlider items={upcoming} componentName="SliderOneGame" />
        </div>
      </Suspense>
    </div>
  );
}

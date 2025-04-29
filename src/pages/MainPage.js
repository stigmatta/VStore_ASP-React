import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import CustomLoader from "../components/CustomLoader";
import CategoryTitle from "../components/CategoryTitle";
import EpicStoreDiv from "../components/EpicStoreDiv";

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
        } = response.data;

        setMainGame(mainGameWithGallery);
        setDiscoverNew(discoverNew);
        setWithDiscount(withDiscount);
        setDealOfTheWeek(dealOfTheWeek);
        setFreeGames(freeGames);
        setPopularGames(popularGames);
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
        {/* <CustomSlider items={seeInShopArr} componentName="SeeInShopGame" /> */}
        <CustomSlider
          items={dealOfTheWeek}
          componentName="DealOfTheWeek"
          visibleSlides={3}
        />
        <FreeGameDiv games={freeGames} />
        <EpicStoreDiv />
        {/*
          <CustomSlider>
            <ColumnCategory title="Most Played" items={colGameArr} />
            <ColumnCategory title="Top Upcoming Wishlist" items={colGameArr} />
            <ColumnCategory title="Top sellers" items={colGameArr} />
          </CustomSlider>
        */}

        <div>
          <CategoryTitle title="Popular Games" />
          <CustomSlider items={popularGames} componentName="SliderOneGame" />
        </div>

        {/*<div>*/}
        {/*  <CategoryTitle title="Recently Updated" />*/}
        {/*  <CustomSlider items={gamesArr} componentName="SliderOneGame" />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <CategoryTitle title="Now on the store" />*/}
        {/*  <CustomSlider items={gamesArr} componentName="SliderOneGame" />*/}
        {/*</div>*/}
      </Suspense>
    </div>
  );
}

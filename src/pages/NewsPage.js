import PageTitle from "../components/PageTitle";
import NewsDiv from "../components/NewsDiv";
import React, { useEffect, useState } from "react";
import BreakLine from "../components/BreakLine";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import CategoryTitle from "../components/CategoryTitle";

export default function NewsPage() {
  const [bigNews, setBigNews] = useState([]);
  const [smallNews, setSmallNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://localhost:7192/api/news", {
          withCredentials: true,
        });
        const { bigNews, smallNews } = response.data;

        setBigNews(bigNews);
        setSmallNews(smallNews);
        console.log(bigNews);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  // const bigNews = Array(2).fill({
  //   image: NewsImage,
  //   text: "Star Wars: Knights of the Old Republic I and II available for free on the Epic Games Store on mobile",
  //   date: new Date("2025-02-27T17:00:00"),
  // });
  //
  // const smallNews = Array(8).fill({
  //   image: SmallNews,
  //   text: "SMITE 2 beginner's guide: Tips for understanding gods, roles, and teamwork",
  //   date: new Date("2025-02-27T17:00:00"),
  // });
  if (loading) {
    return <BounceLoader />;
  }
  if (bigNews.length === 0) return <CategoryTitle title="No news" />;
  return (
    <div>
      <PageTitle title="Relevant news" />
      <div
        className="grid-cols-2 gap-6 justify-between  mt-[31px] hidden
             imd:grid
             "
      >
        {bigNews.map((item, index) => (
          <div key={index}>
            <NewsDiv key={index} news={item} isBig={true} />
          </div>
        ))}
      </div>
      <BreakLine mt={35} mb={35} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {smallNews.map((item, index) => (
          <NewsDiv
            key={index}
            news={item}
            isBig={false}
            className="w-full" // Ensures proper grid behavior
          />
        ))}
      </div>
    </div>
  );
}

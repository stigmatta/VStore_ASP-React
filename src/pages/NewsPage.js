import PageTitle from "../components/PageTitle";
import NewsDiv from "../components/NewsDiv";
import React, { useEffect, useState } from "react";
import BreakLine from "../components/BreakLine";
import axios from "axios";
import CategoryTitle from "../components/CategoryTitle";
import CustomLoader from "../components/CustomLoader";

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

  if (loading) {
    return <CustomLoader />;
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
          <NewsDiv key={index} news={item} isBig={false} className="w-full" />
        ))}
      </div>
    </div>
  );
}

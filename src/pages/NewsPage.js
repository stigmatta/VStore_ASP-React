import PageTitle from "../components/PageTitle";
import NewsDiv from "../components/NewsDiv";
import React, { useEffect, useState } from "react";
import BreakLine from "../components/BreakLine";
import axios from "axios";
import CategoryTitle from "../components/CategoryTitle";
import CustomLoader from "../components/CustomLoader";
import usePagination from "../utils/usePagination";
import CustomPagination from "../components/CustomPagination";

export default function NewsPage() {
  const [bigNews, setBigNews] = useState([]);
  const [smallNews, setSmallNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { page, setPage, totalItems, setTotalItems, itemsPerPage } =
    usePagination(1, 16);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7192/api/news?pageNumber=${page}&pageSize=${itemsPerPage}`,
          {
            withCredentials: true,
          },
        );
        const { bigNews, smallNews, totalCount } = response.data;

        setBigNews(bigNews);
        setSmallNews(smallNews);
        setTotalItems(totalCount || 0);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

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

import PageTitle from "../components/PageTitle";
import Achievement from "../components/Achievement";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from "axios";
import CustomLoader from "../components/CustomLoader";
import usePagination from "../utils/usePagination";
import CustomPagination from "../components/CustomPagination";

export default function AchievementsPage() {
  const params = useParams();
  const { page, setPage, totalItems, setTotalItems, itemsPerPage } =
    usePagination(1, 10);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = params.userId;
  const gameId = params.id;
  const context = userId ? "user" : "game";
  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        let endpoint,
          params = {};

        if (context === "user") {
          endpoint = `https://localhost:7192/api/profile/${userId}/achievements?pageNumber=${page}&pageSize=${itemsPerPage}`;
        } else if (context === "game") {
          endpoint = `https://localhost:7192/api/game/${gameId}/achievements?pageNumber=${page}&pageSize=${itemsPerPage}`;
        }

        const response = await axios.get(endpoint, {
          withCredentials: true,
        });

        setAchievements(response.data.items || []);
        setTotalItems(response.data.totalCount || 0);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userId, gameId, context, page, itemsPerPage]);

  if (loading) return <CustomLoader />;

  return (
    <div>
      <PageTitle
        title={
          context === "user"
            ? "User Achievements"
            : context === "game"
              ? "Game Achievements"
              : "All Achievements"
        }
      />
      <div className="opacity-80 mt-4 mb-7 text-bigButton">
        Amount of achievements: {totalItems}
      </div>
      <div className="flex flex-col gap-4">
        {achievements.map((achievement, index) => (
          <div key={index}>
            <Achievement item={achievement} />
          </div>
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

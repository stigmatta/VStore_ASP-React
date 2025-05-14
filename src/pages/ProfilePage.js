import ProfileTitle from "../components/ProfileTitle";
import DefaultImage from "../images/user-profile.jpg";
import React, { lazy, Suspense, useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import { Ban, Pencil, UserPlus } from "lucide-react";
import GameSectionTitle from "../components/GameSectionTitle";
import ShowMoreGreen from "../components/ShowMoreGreen";
import GameCollectionItem from "../components/GameCollectionItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import EditModal from "../components/EditModal";
import useRedirectToLogin from "../hooks/useRedirectToLogin";
import CustomLoader from "../components/CustomLoader";
import axios from "axios";
import useGetImage from "../hooks/useGetImage";
import useRedirectToGame from "../hooks/useRedirectToGame";
import CustomPagination from "../components/CustomPagination";
import usePagination from "../utils/usePagination";

const CustomSlider = lazy(() => import("../components/CustomSlider"));

export default function ProfilePage() {
  const { userId } = useParams();
  const isAuthorized = useRedirectToLogin(`https://localhost:7192/api/profile`);
  const windowWidth = useWindowWidth();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isSelfProfile, setIsSelfProfile] = useState(null);
  const [userGames, setUserGames] = useState([]);
  const [friendsCount, setFriendsCount] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const avatar = useGetImage(profile?.photo);

  const handleGameClick = useRedirectToGame();
  const { page, setPage, totalItems, setTotalItems, itemsPerPage } =
    usePagination(1, 6);

  const handleOpen = () => {
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!isAuthorized) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7192/api/profile/${userId}`,
          { withCredentials: true },
        );
        const { profile, isSelfProfile } = response.data;
        setProfile(profile);
        setIsSelfProfile(isSelfProfile);
        console.log(profile);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId, isAuthorized]);

  useEffect(() => {
    if (!isAuthorized) return;
    const fetchPaginatedGames = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/profile/${userId}/games?pageNumber=${page}&pageSize=${itemsPerPage}`,
          { withCredentials: true },
        );
        const { userGamesDTO, totalCount } = response.data;
        setUserGames(userGamesDTO || []);
        setTotalItems(totalCount || 0);
      } catch (error) {
        console.error("Error loading games:", error);
        setUserGames([]);
        setTotalItems(0);
      }
    };
    fetchPaginatedGames();
  }, [userId, page, isAuthorized]);
  useEffect(() => {
    if (!isAuthorized) return;
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/profile/${userId}/achievements?pageNumber=${page}&pageSize=${itemsPerPage}`,
          { withCredentials: true },
        );
        setAchievements(response.data.items);
      } catch (error) {
        console.error("Error loading achievements:", error);
      }
    };
    fetchAchievements();
  }, [userId, page, itemsPerPage, isAuthorized]);
  const user = {
    avatar: avatar === "placeholder.jpg" ? avatar : DefaultImage,
    username: profile?.username,
  };

  if (isLoading) return <CustomLoader />;
  return (
    <div>
      <div className="flex">
        <ProfileTitle user={user} />
        <div className="flex ml-auto">
          {windowWidth > 1060 && (
            <Categories
              gamesLength={totalItems ?? userGames?.length ?? 0}
              friendsLength={friendsCount ?? 0}
            />
          )}
          {isSelfProfile ? (
            <div className="hoverSvg hover:cursor-pointer" onClick={handleOpen}>
              <Pencil size={30} />
            </div>
          ) : (
            <div className="flex gap-2 self-start md:gap-5 ">
              <UserPlus size={30} />
              <Ban size={30} />
            </div>
          )}
        </div>
      </div>
      {windowWidth < 1060 && (
        <Categories
          gamesLength={totalItems ?? userGames?.length ?? 0}
          friendsLength={friendsCount ?? 0}
        />
      )}
      {achievements && achievements.length > 0 && (
        <>
          <GameSectionTitle title="Achievements" />
          <Suspense fallback={<CustomLoader />}>
            <CustomSlider
              items={achievements}
              componentName="AchievementForSlider"
            />
          </Suspense>
          <ShowMoreGreen isUser={true} id={userId} items={achievements} />
        </>
      )}

      <GameSectionTitle title={"Game collection"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {userGames &&
          userGames.length > 0 &&
          userGames.map((game, i) => (
            <div key={i}>
              <GameCollectionItem onClick={handleGameClick} item={game} />
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
      <Dialog
        open={modalIsOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "25%", bgcolor: "#393E46", maxWidth: "80%" },
        }}
      >
        <DialogContent sx={{ color: "#EEEEEE", padding: 0 }}>
          <EditModal user={user} closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CategoryAndDigit({ title, digit }) {
  return (
    <div className="flex flex-col">
      <span className="opacity-80 text-title">{title}</span>
      <span className="text-3xl text-center">{digit}</span>
    </div>
  );
}

function Categories({ gamesLength = 0, friendsLength = 0 }) {
  return (
    <div className="flex relative bottom-0 items-center justify-around mt-9 lg:mt-0 lg:gap-14 lg:justify-start lg:bottom-3">
      <CategoryAndDigit title={"Games"} digit={gamesLength ?? 0} />
      <Link to="/Friends">
        <CategoryAndDigit title={"Friends"} digit={friendsLength} />
      </Link>
    </div>
  );
}

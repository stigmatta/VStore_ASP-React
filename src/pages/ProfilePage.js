import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import { Ban, Pencil, UserPlus, UserMinus, Mail } from "lucide-react";

// Components
import ProfileTitle from "../components/ProfileTitle";
import GameSectionTitle from "../components/GameSectionTitle";
import ShowMoreGreen from "../components/ShowMoreGreen";
import GameCollectionItem from "../components/GameCollectionItem";
import EditModal from "../components/EditModal";
import CustomLoader from "../components/CustomLoader";
import CustomPagination from "../components/CustomPagination";
import AlertDialog from "../components/AlertDialog";

// Hooks
import useWindowWidth from "../hooks/useWindowWidth";
import useRedirectToLogin from "../hooks/useRedirectToLogin";
import useRedirectToGame from "../hooks/useRedirectToGame";
import usePagination from "../utils/usePagination";
import { useCurrentUser } from "../hooks/useCurrentUser";

// Assets
import DefaultImage from "../images/user-profile.jpg";

const CustomSlider = lazy(() => import("../components/CustomSlider"));

export default function ProfilePage() {
  const { userId } = useParams();
  const isAuthorized = useRedirectToLogin(`https://localhost:7192/api/profile`);
  const windowWidth = useWindowWidth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertAction, setAlertAction] = useState("remove");
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("Stranger");
  const [userGames, setUserGames] = useState([]);
  const [friendsCount, setFriendsCount] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const selfUser = useCurrentUser();

  const handleGameClick = useRedirectToGame();
  const { page, setPage, totalItems, setTotalItems, itemsPerPage } =
    usePagination(1, 6);

  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);
  const handleAlertOpen = () => setAlertIsOpen(true);
  const handleAlertClose = () => setAlertIsOpen(false);

  const avatar = useMemo(() => {
    if (profile?.photo) {
      if (profile.photo.startsWith("http")) {
        return profile.photo;
      } else {
        return `https://localhost:7192/${profile.photo}`;
      }
    }
    return DefaultImage;
  }, [profile?.photo]);

  const user = useMemo(
    () => ({
      avatar,
      username: profile?.username || "Your name",
    }),
    [avatar, profile],
  );

  const actionHandlers = {
    remove: async () => {
      try {
        await axios.delete(
          `https://localhost:7192/api/profile/${selfUser.id}/delete/${userId}`,
          { withCredentials: true },
        );
        setStatus("Stranger");
        setFriendsCount((prevState) => prevState - 1);
      } catch (error) {
        console.error("Error removing friend:", error);
      }
    },
    block: async () => {
      try {
        await axios.post(
          `https://localhost:7192/api/profile/${selfUser.id}/block`,
          {},
          { withCredentials: true },
        );
        setStatus("Blocked");
      } catch (error) {
        console.error("Error blocking user:", error);
      }
    },
    unblock: async () => {
      try {
        await axios.post(
          `https://localhost:7192/api/profile/${selfUser.id}/unblock`,
          {},
          { withCredentials: true },
        );
        setStatus("Stranger");
      } catch (error) {
        console.error("Error unblocking user:", error);
      }
    },
  };

  const STATUS_COMPONENTS = {
    Self: ({ handleOpen }) => (
      <div className="hoverSvg hover:cursor-pointer" onClick={handleOpen}>
        <Pencil size={30} />
      </div>
    ),
    Friend: () => (
      <div className="flex gap-2 self-start md:gap-5">
        <div
          className="hoverSvg hover:cursor-pointer"
          onClick={() => {
            setAlertAction("remove");
            setAlertIsOpen(true);
          }}
        >
          <UserMinus size={30} />
        </div>
        <div
          className="red-hover hover:cursor-pointer"
          onClick={() => {
            setAlertIsOpen(true);
            setAlertAction("block");
          }}
        >
          <Ban size={30} />
        </div>
      </div>
    ),
    Pending: () => (
      <div className="flex gap-2 self-start md:gap-5">
        <div className="hover:cursor-pointer">
          <Mail size={30} className="text-yellow-500" />
        </div>
        <div
          className="red-hover hover:cursor-pointer"
          onClick={() => {
            setAlertIsOpen(true);
            setAlertAction("block");
          }}
        >
          <Ban size={30} />
        </div>
      </div>
    ),
    Blocked: () => (
      <div className="hoverSvg hover:cursor-pointer">
        <Ban size={30} className="text-red-500" />
      </div>
    ),
    Stranger: () => (
      <div className="flex gap-2 self-start md:gap-5">
        <div className="hoverSvg hover:cursor-pointer">
          <UserPlus size={30} />
        </div>
        <div
          className="red-hover hover:cursor-pointer"
          onClick={() => {
            setAlertIsOpen(true);
            setAlertAction("block");
          }}
        >
          <Ban size={30} />
        </div>
      </div>
    ),
  };

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const [profileRes, gamesRes, achievementsRes] = await Promise.all([
          axios.get(`https://localhost:7192/api/profile/${userId}`, {
            withCredentials: true,
          }),
          axios.get(
            `https://localhost:7192/api/profile/${userId}/games?pageNumber=${page}&pageSize=${itemsPerPage}`,
            { withCredentials: true },
          ),
          axios.get(
            `https://localhost:7192/api/profile/${userId}/achievements?pageNumber=${page}&pageSize=${itemsPerPage}`,
            { withCredentials: true },
          ),
        ]);

        setProfile(profileRes.data.profile);
        setStatus(profileRes.data.status);
        setFriendsCount(profileRes.data.friendCount || 0);

        setUserGames(gamesRes.data.userGamesDTO || []);
        setTotalItems(gamesRes.data.totalCount || 0);

        setAchievements(achievementsRes.data.items || []);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, page, itemsPerPage, isAuthorized]);

  if (isLoading) return <CustomLoader />;

  return (
    <div className="profile-page">
      <div className="flex">
        <ProfileTitle user={user} />
        <div className="flex ml-auto">
          {windowWidth > 1060 && (
            <Categories
              gamesLength={totalItems}
              friendsLength={friendsCount}
              userId={userId}
              status={status}
            />
          )}
          <div>
            {STATUS_COMPONENTS[status]?.({
              handleOpen,
              handleAlertOpen,
            })}
          </div>
        </div>
      </div>

      {windowWidth < 1060 && (
        <Categories
          gamesLength={totalItems}
          friendsLength={friendsCount}
          userId={userId}
          status={status}
        />
      )}

      {achievements.length > 0 && (
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

      <GameSectionTitle title="Game collection" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {userGames.map((game, i) => (
          <div key={`${game.id}-${i}`}>
            <GameCollectionItem onClick={handleGameClick} item={game} />
          </div>
        ))}
      </div>

      {totalItems > itemsPerPage && (
        <CustomPagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
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

      <AlertDialog
        open={alertIsOpen}
        onClose={handleAlertClose}
        actionType={alertAction}
        onConfirm={() => {
          if (actionHandlers[alertAction]) {
            actionHandlers[alertAction]();
          }
          handleAlertClose();
        }}
      />
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

function Categories({ gamesLength = 0, friendsLength = 0, userId, status }) {
  return (
    <div className="flex relative bottom-0 items-center justify-around mt-9 lg:mt-0 lg:gap-14 lg:justify-start lg:bottom-3">
      <CategoryAndDigit title="Games" digit={gamesLength} />
      {status === "Self" ? (
        <Link
          to={`/profile/${userId}/friends`}
          className="hover:opacity-80 transition-opacity"
          aria-label="View friends"
        >
          <CategoryAndDigit title="Friends" digit={friendsLength} />
        </Link>
      ) : (
        <CategoryAndDigit title="Friends" digit={friendsLength} />
      )}
    </div>
  );
}

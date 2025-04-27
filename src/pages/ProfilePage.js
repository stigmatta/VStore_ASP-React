import ProfileTitle from "../components/ProfileTitle";
import Image from "../images/user-profile.jpg";
import AchievementImage from "../images/achievement.png";
import React from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import { Ban, Pencil, UserPlus } from "lucide-react";
import GameSectionTitle from "../components/GameSectionTitle";
import CustomSlider from "../components/CustomSlider";
import ShowMoreGreen from "../components/ShowMoreGreen";
import GameImage from "../images/game-collection.png";
import GameCollectionItem from "../components/GameCollectionItem";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import EditModal from "../components/EditModal";
import useRedirectToLogin from "../hooks/useRedirectToLogin";

export default function ProfilePage() {
  useRedirectToLogin("https://localhost:7192/api/profile");
  // const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get("https://localhost:7192/api/profile", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       if (error.response?.status === 401) {
  //         navigate("/login", { state: { from: "/profile" } }); // Optional: Save where user came from
  //       } else {
  //         console.error("API Error:", error);
  //       }
  //     });
  // }, [navigate]);
  const windowWidth = useWindowWidth();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };
  const isMe = true;
  const user = {
    avatar: Image,
    username: "dimabalawov",
  };
  const achievements = Array(6).fill({
    image: AchievementImage,
    title: "Professional newbies",
    description: "Complete the games at the easiest difficulty",
    percent: 35,
  });

  const games = Array(6).fill({
    image: GameImage,
    title: "Hades",
    achievements: Array(3)
      .fill(null)
      .map(() => ({
        image: AchievementImage,
      })),
    hoursPlayed: 53,
    completed: 70,
  });

  return (
    <div>
      <div className="flex">
        <ProfileTitle user={user} />
        <div className="flex ml-auto">
          {windowWidth > 1060 && <Categories />}
          {isMe ? (
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

      {windowWidth < 1060 && <Categories />}
      <GameSectionTitle title="Achievements" />
      <CustomSlider items={achievements} componentName="AchievementForSlider" />
      <ShowMoreGreen />
      <GameSectionTitle title={"Game collection"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {games.map((g, i) => (
          <div key={i}>
            <GameCollectionItem item={g} />
          </div>
        ))}
      </div>
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

function Categories() {
  return (
    <div
      className="flex  relative bottom-0 items-center justify-around mt-9
    lg:mt-0 lg:gap-14 lg:justify-start lg:bottom-3"
    >
      <CategoryAndDigit title={"Games"} digit={48} />
      <Link to="/Friends">
        <CategoryAndDigit title={"Friends"} digit={7} />
      </Link>
    </div>
  );
}

import ProfileTitle from "../components/ProfileTitle";
import Image from "../images/user-profile.jpg";
import AchievementImage from "../images/achievement.png";
import React from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import { Ban, UserPlus } from "lucide-react";
import GameSectionTitle from "../components/GameSectionTitle";
import CustomSlider from "../components/CustomSlider";
import ShowMoreGreen from "../components/ShowMoreGreen";
import GameImage from "../images/game-collection.png";
import GameCollectionItem from "../components/GameCollectionItem";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const windowWidth = useWindowWidth();
  const user = {
    avatar: Image,
    username: "dimabalawov",
  };
  const achievements = Array(6).fill({
    image: AchievementImage,
    title: "Professional newbies",
    description: "Complete the game at the easiest difficulty",
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
          <div className="flex gap-2 self-start md:gap-5 ">
            <UserPlus size={30} />
            <Ban size={30} />
          </div>
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

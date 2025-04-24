import PageTitle from "../components/PageTitle";
import AchievementImage from "../images/achievement.png";
import Achievement from "../components/Achievement";

export default function AchievementsPage() {
  const achievements = [
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 5,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 15,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 25,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 35,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 45,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 55,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 65,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 75,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 85,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 95,
    },
    {
      image: AchievementImage,
      title: "Professional newbies",
      description: "Complete the games at the easiest difficulty",
      percent: 100,
    },
  ];

  return (
    <div>
      <PageTitle title="Achievements" />
      <div className="opacity-80 mt-4 mb-7 text-bigButton">
        Amount of achievements:{achievements.length}
      </div>
      <div className="flex flex-col gap-4">
        {achievements.map((achievement, index) => (
          <div key={index}>
            <Achievement item={achievement} />
          </div>
        ))}
      </div>
    </div>
  );
}

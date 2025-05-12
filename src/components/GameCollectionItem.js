import { styled } from "@mui/material/styles";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import useGetImage from "../hooks/useGetImage";
import useGetImages from "../hooks/useGetImages";

export default function GameCollectionItem({ item, onClick }) {
  const logo = useGetImage(item.logoLink);
  const lastPlayed = new Date(item.lastPlayed).toLocaleDateString("en-gb");

  return (
    <div className="p-4 bg-gray-light flex flex-col rounded-md">
      <img
        className="max-h-[200px] w-full object-cover object-center rounded hover:cursor-pointer"
        src={logo}
        alt={item.title}
        onClick={() => onClick?.(item.id)}
      />

      <span className="text-title font-black mt-4">{item.title}</span>

      <div className="flex justify-between mt-4 gap-3 w-full flex-row item-start md:flex-col lg:flex-row lg:items-center">
        <div className="flex gap-4">
          {item?.achievements?.length > 0 ? (
            item.achievements.slice(0, 4).map((ach, index) => (
              <div key={ach.id || index}>
                <AchievementImage logo={ach.photo} />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No achievements yet</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-normal opacity-70 min-w-fit">
            {item.hoursPlayed} hours played on record
          </span>
          <span className="font-normal opacity-70 min-w-fit">
            Last played: {lastPlayed}
          </span>
        </div>
      </div>

      <div className="opacity-70 font-normal mt-2">
        Completed {item.completedPercent}%
        <CustomProgress variant="determinate" value={item.completedPercent} />
      </div>
    </div>
  );
}

const AchievementImage = ({ logo }) => {
  const photo = useGetImage(logo);
  return (
    <img
      src={photo}
      alt={"achievement"}
      className="w-10 h-10 object-contain rounded-md"
    />
  );
};

const CustomProgress = styled(LinearProgress)(({}) => ({
  [`&.${linearProgressClasses.root}`]: {
    height: "25px",
    backgroundColor: "#222831",
    border: "1px solid #606976",
    borderRadius: "8px",
    width: "40%",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#606976",
  },
}));

import { styled } from "@mui/material/styles";
import { LinearProgress, linearProgressClasses } from "@mui/material";

export default function GameCollectionItem({ item }) {
  return (
    <div className="p-4 bg-gray-light flex flex-col rounded-md">
      <img
        className="max-h-[200px] w-full object-cover object-center rounded"
        src={item.image}
        alt={item.title}
      />
      <span className="text-title font-black mt-4">{item.title}</span>
      <div
        className="flex justify-between mt-4 gap-3 w-full flex-row  item-start
      md:flex-col
       lg:flex-row lg:items-center"
      >
        <div className="flex gap-4">
          {item.achievements.map((ach, index) => (
            <img
              key={index}
              src={ach.image?.default || ach.image}
              alt={`Achievement ${index + 1}`}
              className="w-10 h-10 object-contain"
            />
          ))}
        </div>

        <span className="font-normal opacity-70 min-w-fit">
          {item.hoursPlayed} hours played on record
        </span>
      </div>
      <div className="opacity-70 font-normal mt-2">
        Completed {item.completed}%
        <CustomProgress variant="determinate" value={item.completed} />
      </div>
    </div>
  );
}

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

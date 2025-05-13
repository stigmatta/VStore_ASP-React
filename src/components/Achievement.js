import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import useGetImage from "../hooks/useGetImage";

const CustomProgress = styled(LinearProgress)(({}) => ({
  [`&.${linearProgressClasses.root}`]: {
    height: "121px",
    backgroundColor: "#222831",
    border: "1px solid #606976",
    borderRadius: "4px",
  },

  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#393E46",
  },
}));

export default function Achievement({ item }) {
  const logo = useGetImage(item.photo);
  const percent = Math.floor(Math.random() * 101);
  return (
    <div className="w-full relative">
      <div className="absolute flex flex-row left-0 top-0 z-10 h-full w-full pr-5 items-center">
        <img className="h-full" src={logo} alt={item.title} />
        <div className="flex flex-col gap-1 ml-5 ">
          <span className="text-highlightedText">{item.title}</span>
          <span className="font-normal opacity-80">{item.description}</span>
        </div>
        <span className="text-green font-normal text-bigButton ml-auto">
          {percent}%
        </span>
      </div>

      <CustomProgress variant="determinate" value={percent} />
    </div>
  );
}

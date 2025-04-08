import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.root}`]: {
    height: "121px",
    backgroundColor: "#222831",
    border: "1px solid #606976",
    borderRadius: "4px",
  },

  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#393E46',
  },
}));

export default function Achievement({ item }) {
  return (
    <div className="w-full relative">
        <div className="absolute flex flex-row left-0 top-0 z-10 h-full w-full pr-5 items-center">
           <img className="h-full" src={item.image} alt={item.title}/>
            <div className="flex flex-col gap-1 ml-5 ">
                <span className="text-highlightedText">Professional newbies</span>
                <span className="font-normal opacity-80">Complete the game at the easiest difficulty</span>
            </div>
            <span className="text-green font-normal text-bigButton ml-auto">{item.percent}%</span>
        </div>

      <CustomProgress variant="determinate" value={item.percent} />
    </div>
  );
}

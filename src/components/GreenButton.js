import { Download } from "lucide-react";
import useWindowWidth from "../hooks/useWindowWidth";

export default function GreenButton({ text, px, height }) {
    const windowWidth = useWindowWidth();
    return (
      <button style={{ paddingInline: px, height: height }} className="w-fit flex justify-center items-center bg-green rounded-md text-gray hover:bg-green-lighter">
            {windowWidth > 1060 ? text : <Download size={16} />}
      </button>
    );
}
  
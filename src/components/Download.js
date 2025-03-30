import { Download } from "lucide-react";
import useWindowWidth from "../hooks/useWindowWidth";

export default function DownloadButton(){
    const windowWidth = useWindowWidth();
    return(
        <>
        {windowWidth > 1060 ? <button className="w-24 font-medium h-10 flex justify-center items-center text-gray bg-green rounded-md hover:bg-green-lighter">Download</button> :
        <button className="w-10 h-10 flex justify-center items-center bg-green rounded-md text-gray hover:bg-green-lighter">
            <Download size="16"/>
        </button>}

        </>
    )
}
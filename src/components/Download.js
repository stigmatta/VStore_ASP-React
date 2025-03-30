import { Download } from "lucide-react";

export default function DownloadButton(){
    return(
        <button className="w-10 h-10 flex justify-center items-center bg-green rounded-md text-gray hover:bg-green-lighter">
            <Download size="16"/>
        </button>
    )
}
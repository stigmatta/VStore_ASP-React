import {Backdrop} from "@mui/material";
import VLogo from "./VLogo";

export default function ReceiptModal(){
    return(
        <div className="px-24 lg:px-48 max-w-[90%] h-[600px] w-fit bg-form-gradient flex flex-col gap-6 items-center justify-center">
            <VLogo width={"70px"} height={"70px"}/>
            <span className="lg:w-full font-bold text-formTitle text-center">Thank you for buying our games!</span>
            <div className="font-normal opacity-80 text-center">
                <span>An email receipt has been sent to you.</span>
                <br/><br/>
                <span>If there is anything else you need, feel free to browse our shop! </span>
            </div>
        </div>
    )
}
import EpicStore from '../images/epic-store.png'
import {Download} from "lucide-react";

export default function EpicStoreDiv() {
    return (
        <div className="hidden flex-col  w-full justify-between items-left h-fit gap-14
                        imd:flex
                        l:flex-row l:h-[392px] l:items-center">
            <img className="object-contain h-full" src={EpicStore} alt="epic-store-img" />
            <div className="flex flex-col items-left">
                <div className="flex flex-col gap-3">
                    <h1 className="text-title font-black">Vision Store Mobile</h1>
                    <span className="font-normal opacity-70">Feudal Gotham’s Dark Night, Ninja Knight Batman, and the malicious wildcard
                        Karuta Harley Quinn strike with a vengeance.
                    </span>
                </div>
                <button className="mt-10 w-[165px] h-[40px] flex flex-row items-center justify-center gap-2.5 bg-green rounded hover:bg-green-lighter">
                    <span className="text-gray font-black">Install mobile</span>
                    <Download size={20} color="#222831" />
                </button>
            </div>
        </div>
    )
}
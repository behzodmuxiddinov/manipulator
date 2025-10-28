import { FaArrowDown } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";

export const Directions = () => {
    return (
        <div className="flex gap-3">
            <div>
                Л: <FaArrowLeft />
            </div>
            <div>
                П: <FaArrowRight />
            </div>
            <div>
                В: <FaArrowUp />
            </div>
            <div>
                Н: <FaArrowDown />
            </div>
        </div>
        // <p className="text-xs text-muted-foreground mt-2">Л = Left, П = Right, В = Down, Н = Up</p>
    )
};
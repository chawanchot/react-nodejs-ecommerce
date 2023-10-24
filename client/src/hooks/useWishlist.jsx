import { useContext } from "react";
import WishlistContext from "../context/WishlistContext";

const useFav = () => {
    return useContext(WishlistContext);
}

export default useFav;
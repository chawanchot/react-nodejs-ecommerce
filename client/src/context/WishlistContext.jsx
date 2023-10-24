import { useState } from "react";
import { createContext } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItem, setWishlistItem] = useState([]);

    return (
        <WishlistContext.Provider value={{ wishlistItem, setWishlistItem }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;

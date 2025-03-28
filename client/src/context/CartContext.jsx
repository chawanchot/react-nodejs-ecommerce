import { useState } from "react";
import { createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    return (
        <CartContext.Provider value={{ cartItem, setCartItem, cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;

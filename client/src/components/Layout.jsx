import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Subscribe from "./Subscribe/Subscribe";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import axios from "../services/axios";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Layout() {
    const { loggedIn, setLoggedIn, setProfile, logOut } = useAuth();
    const { setCartItem, setCartCount } = useCart();
    const { setWishlistItem } = useWishlist();

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        setCartCount(cart ? cart.length : 0);
        
        if (loggedIn) {
            axios.get("/user/profile" , {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("AUTH")
                }
            })
            .then((resp) => {
                setProfile(resp.data.data[0]);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setCartItem([]);
                    setCartCount(0);
                    logOut();
                }
            })

            axios
                .get("/wishlist", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("AUTH"),
                    },
                })
                .then((resp) => {
                    setWishlistItem(resp.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <>
            <Header />
            <Outlet />
            <Subscribe />
            <Footer />
        </>
    );
}

export default Layout;

import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";

function Header() {
    const { loggedIn, setLoggedIn, setProfile } = useAuth();
    const { setCartItem, cartCount, setCartCount } = useCart();
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("AUTH");
        localStorage.removeItem("RE_A");
        setLoggedIn(false);
        setProfile([]);
        setCartItem([]);
        setCartCount(0);
        navigate("/login");
    };

    const fetchCartData = () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            axios.post("/cart", {
            cartData: cart
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("AUTH")
            }
        })
        .then((resp) => {
            setCartItem(resp.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
        }
    }

    const handleOverlayMenu = () => {
        let element = document.getElementsByClassName("overlay__menu");
        element[0].classList.toggle("active");
    };

    const handleCartMenu = () => {
        let element = document.getElementsByClassName("cart__overlay");
        element[0].classList.toggle("active");
    };

    const openCartMenu = () => {
        if (loggedIn) {
            fetchCartData();
            handleCartMenu();
        } else {
            navigate("/login");
        };
    };

    return (
        <React.Fragment>
            <header className="bg-gray-100 shadow-lg mb-5">
                <div className="container mx-auto">
                    <div className="py-6 flex items-center">
                        <div className="grid grid-cols-4 w-screen">
                            <div className="text-center lg:text-left">
                                <button onClick={handleOverlayMenu}>
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        viewBox="0 0 512 512"
                                        height="1.7em"
                                        width="1.7em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 272H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 368H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="col-span-2">
                                <div className="text-base lg:text-xl text-zinc-500 text-center font-bold">
                                    ECOMMERCE
                                </div>
                            </div>
                            <div>
                                <div className="text-center lg:text-right inline">
                                    <ul className="list-none list-outside text-zinc-500">
                                        <li className="inline mr-0 sm:mr-5">
                                            <button onClick={openCartMenu}>
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    viewBox="0 0 512 512"
                                                    height="1.2em"
                                                    width="1.2em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="inline"
                                                >
                                                    <ellipse
                                                        transform="rotate(-1.057 159.995 423.97) scale(.99997)"
                                                        cx="160"
                                                        cy="424"
                                                        rx="24"
                                                        ry="24"
                                                    ></ellipse>
                                                    <ellipse
                                                        transform="matrix(.02382 -.9997 .9997 .02382 -48.51 798.282)"
                                                        cx="384.5"
                                                        cy="424"
                                                        rx="24"
                                                        ry="24"
                                                    ></ellipse>
                                                    <path d="M463.8 132.2c-.7-2.4-2.8-4-5.2-4.2L132.9 96.5c-2.8-.3-6.2-2.1-7.5-4.7-3.8-7.1-6.2-11.1-12.2-18.6-7.7-9.4-22.2-9.1-48.8-9.3-9-.1-16.3 5.2-16.3 14.1 0 8.7 6.9 14.1 15.6 14.1s21.3.5 26 1.9c4.7 1.4 8.5 9.1 9.9 15.8 0 .1 0 .2.1.3.2 1.2 2 10.2 2 10.3l40 211.6c2.4 14.5 7.3 26.5 14.5 35.7 8.4 10.8 19.5 16.2 32.9 16.2h236.6c7.6 0 14.1-5.8 14.4-13.4.4-8-6-14.6-14-14.6H188.9c-2 0-4.9 0-8.3-2.8-3.5-3-8.3-9.9-11.5-26l-4.3-23.7c0-.3.1-.5.4-.6l277.7-47c2.6-.4 4.6-2.5 4.9-5.2l16-115.8c.2-.8.2-1.7 0-2.6z"></path>
                                                </svg>
                                                <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{cartCount}</span>
                                            </button>
                                        </li>
                                        <li className="inline">
                                            <Link
                                                to={
                                                    loggedIn
                                                        ? "/account/profile"
                                                        : "/login"
                                                }
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    viewBox="0 0 512 512"
                                                    height="1.2em"
                                                    width="1.2em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="inline"
                                                >
                                                    <path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"></path>
                                                </svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Overlay Header Menu */}
            <div className="overlay__menu">
                <div className="overlay__menu__content fixed z-50 top-0 left-0 table w-full h-full duration-200 invisible opacity-0">
                    <button
                        className="absolute top-20 right-20"
                        onClick={handleOverlayMenu}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            viewBox="0 0 512 512"
                            height="3em"
                            width="3em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
                        </svg>
                    </button>
                    <div className="flex items-center justify-center h-screen overflow-auto">
                        <ul className="text-center list-none list-outside">
                            <li className="mb-4">
                                <Link
                                    to="/"
                                    className="font-bold text-4xl duration-500 text-gray-500 hover:text-black"
                                    onClick={handleOverlayMenu}
                                >
                                    HOME
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link
                                    to="/"
                                    className="font-bold text-4xl duration-500 text-gray-500 hover:text-black"
                                    onClick={handleOverlayMenu}
                                >
                                    SHOP
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link
                                    to={loggedIn ? "/account/profile" : "/login"}
                                    className="font-bold text-4xl duration-500 text-gray-500 hover:text-black"
                                    onClick={handleOverlayMenu}
                                >
                                    ACCOUNT
                                </Link>
                            </li>
                            {loggedIn && (
                                <li className="mb-4">
                                    <Link
                                        onClick={logOut}
                                        className="font-bold text-4xl duration-500 text-gray-500 hover:text-black"
                                    >
                                        LOGOUT
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Cart handleCartMenu={handleCartMenu} />
        </React.Fragment>
    );
}

export default Header;

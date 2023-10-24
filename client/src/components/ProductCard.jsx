import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { FaHeart } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

function ProductCard(props) {
    const {
        data: { id, name, img, price, discount_percent },
        fav,
    } = props;
    const { loggedIn, logOut } = useAuth();
    const { setCartItem, setCartCount } = useCart();
    const navigate = useNavigate();
    const { setWishlistItem } = useWishlist();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        setIsFav(false);
        for (const index in fav) {
            if (fav[index].id === id) {
                setIsFav(true);
                break;
            }
        }
    }, [fav]);

    const toastSetting = {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    };
    const notify = (text, status) => {
        switch (status) {
            case "success":
                toast.success(text, toastSetting);
                break;
            case "error":
                toast.error(text, toastSetting);
                break;
            default:
                toast(text, toastSetting);
        }
    };

    const clickFav = (id, favState) => {
        if (loggedIn) {
            if (favState) {
                axios
                    .post(
                        "/wishlist/remove",
                        {
                            product: id,
                        },
                        {
                            headers: {
                                Authorization:
                                    "Bearer " + localStorage.getItem("AUTH"),
                            },
                        }
                    )
                    .then((resp) => {
                        if (resp.data.status === "success") {
                            setWishlistItem(resp.data.data);
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            setCartItem([]);
                            setCartCount(0);
                            logOut();
                        } else {
                            notify(
                                !err?.response?.data?.message
                                    ? "ไม่สำเร็จ กรุณาลองใหม่"
                                    : err?.response?.data?.message,
                                "error"
                            );
                        }
                    });
            } else {
                axios
                    .post(
                        "/wishlist",
                        {
                            product: id,
                        },
                        {
                            headers: {
                                Authorization:
                                    "Bearer " + localStorage.getItem("AUTH"),
                            },
                        }
                    )
                    .then((resp) => {
                        if (resp.data.status === "success") {
                            setWishlistItem(resp.data.data);
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            setCartItem([]);
                            setCartCount(0);
                            logOut();
                        } else {
                            notify(
                                !err?.response?.data?.message
                                    ? "ไม่สำเร็จ กรุณาลองใหม่"
                                    : err?.response?.data?.message,
                                "error"
                            );
                        }
                    });
            }
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="px-4">
            <div className="relative mb-3">
                {/* Discount Image */}
                <Link to={"/product/" + id}>
                    <img
                        src={img}
                        alt={name}
                        className="bg-zinc-100 rounded-2xl duration-500 w-full h-48 sm:h-64 xl:h-80 object-contain hover:shadow-xl"
                    />
                </Link>
                {/* Discount Badge */}
                {discount_percent !== 0 ? (
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-600 w-10 h-10 sm:w-14 sm:h-14 rounded-full">
                        <span className="text-white absolute font-bold left-1 top-2 lg:left-2 lg:top-4 text-sm lg:text-base">
                            -{discount_percent}%
                        </span>
                    </div>
                ) : (
                    <></>
                )}
                {/* Favorite Icon */}
                <div
                    className="absolute top-3 right-3 z-10"
                    onClick={() => clickFav(id, isFav)}
                >
                    <button
                        aria-label="add to favorite"
                        className={
                            "fav__icon flex justify-center items-center border-solid border-2 text-gray-600 border-gray-200 rounded-lg w-8 h-8 duration-500 hover:bg-red-500 hover:text-white hover:border-none" +
                            (isFav ? " active" : "")
                        }
                    >
                        <FaHeart />
                    </button>
                </div>
            </div>
            {/* Product Name */}
            <h5 className="whitespace-nowrap overflow-hidden text-ellipsis text-xs sm:text-base">
                {name}
            </h5>
            {/* Price Section */}
            <div className="flex justify-between items-center mt-1">
                <div>
                    {discount_percent !== 0 ? (
                        <>
                            <span className="text-gray-500 text-xs sm:text-sm line-through">
                                ฿ {price.toLocaleString()}
                            </span>{" "}
                            <span className="text-sm sm:text-base font-bold">
                                ฿{" "}
                                {(
                                    price -
                                    price * (discount_percent / 100)
                                ).toLocaleString()}
                            </span>
                        </>
                    ) : (
                        <span className="text-sm sm:text-base font-bold">
                            ฿ {price.toLocaleString()}
                        </span>
                    )}
                </div>
                {/* Add to cart */}
                {/* <button className="border-solid border-2 text-gray-600 border-gray-100 rounded-lg w-8 h-8 duration-500 hover:bg-gray-500 hover:text-white hover:border-none" aria-label="add to cart">
                    <i className="fa fa-plus"></i>
                </button> */}
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProductCard;

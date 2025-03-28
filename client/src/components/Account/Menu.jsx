import React from "react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaHeart, FaListAlt, FaCogs, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Menu({ page }) {
    const { setLoggedIn, setProfile } = useAuth();
    const { setCartItem, setCartCount } = useCart();

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

    return (
        <div className="py-5 px-5 w-full lg:w-80 shadow rounded-lg text-gray-700">
            <Link to="/account/profile">
                <div
                    className={`py-2 px-2 duration-200 hover:bg-gray-100 cursor-pointer ${
                        page === "profile" ? "bg-gray-100" : undefined
                    }`}
                >
                    <div className="flex items-center">
                        <FaUserCircle className="mr-2" />
                        <span>Profile</span>
                    </div>
                </div>
            </Link>
            <Link to="/account/wishlist">
                <div
                    className={`py-2 px-2 duration-200 hover:bg-gray-100 cursor-pointer ${
                        page === "wishlist" ? "bg-gray-100" : undefined
                    }`}
                >
                    <div className="flex items-center">
                        <FaHeart className="mr-2" />
                        <span>Wishlist</span>
                    </div>
                </div>
            </Link>
            <div
                className={`py-2 px-2 duration-200 hover:bg-gray-100 cursor-pointer ${
                    page === "orders" ? "bg-gray-100" : undefined
                }`}
            >
                <div className="flex items-center">
                    <FaListAlt className="mr-2" />
                    <span>Orders</span>
                </div>
            </div>
            <div
                className={`py-2 px-2 duration-200 hover:bg-gray-100 cursor-pointer ${
                    page === "setting" ? "bg-gray-100" : undefined
                }`}
            >
                <div className="flex items-center">
                    <FaCogs className="mr-2" />
                    <span>Update Profile</span>
                </div>
            </div>
            <div
                className="py-2 px-2 duration-200 hover:bg-gray-100 cursor-pointer"
                onClick={logOut}
            >
                 <div className="flex items-center">
                    <FaSignOutAlt className="mr-2" />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}

export default Menu;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../services/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useFav from "../../hooks/useWishlist";

function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassowrd] = useState("");
    const { setLoggedIn, setProfile } = useAuth();
    const { setCartCount } = useCart();
    const { setFavItem } = useFav();
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phone || !password) {
            notify("กรอกข้อมูลให้ครบถ้วน", "error");
            return;
        }
        if (isNaN(phone) || phone.length !== 10) {
            notify("เบอร์โทรศัพท์ไม่ถูกต้อง", "error");
            return;
        }
        axios
            .post("/auth/login", {
                phone,
                password,
            })
            .then((resp) => {
                if (resp.data.status === "success") {
                    localStorage.setItem("AUTH", resp.data.token);
                    localStorage.setItem("RE_A", resp.data.refreshToken);
                    setProfile(resp.data.data[0]);
                    setLoggedIn(true);
                    let cart = JSON.parse(localStorage.getItem("cart"));
                    setCartCount(cart ? cart.length : 0);
                    setFavItem(resp.data.fav);
                    setPhone("");
                    setPassowrd("");
                    navigate("/");
                }
            })
            .catch((err) => {
                notify(
                    !err?.response?.data?.message
                        ? "ไม่สามารถเข้าสู่ระบบได้"
                        : err?.response?.data?.message,
                    "error"
                );
            });
    };

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <section className="max-w-[90%] mx-auto">
            <h1 className="text-center font-bold text-gray-500 py-10 text-xl">
                Account SignIn
            </h1>
            <div className="bg-gray-100 rounded-lg w-full sm:w-1/2 m-auto pl-10 pr-10 pt-14 pb-14">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Phone number"
                        className="sign__form"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength="10"
                    />
                    <input
                        type="password"
                        placeholder="Passowrd"
                        className="sign__form mt-5"
                        value={password}
                        onChange={(e) => setPassowrd(e.target.value)}
                    />
                    <div className="w-full mt-10 text-center">
                        <button
                            type="submit"
                            className="py-3 w-36 text-base font-bold rounded-lg bg-black text-white opacity-90 duration-300"
                        >
                            SIGN IN
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-400">
                        register
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </section>
    );
}

export default Login;

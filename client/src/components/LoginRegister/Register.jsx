import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "../../services/axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Register() {
    const navigate = useNavigate();
    const { setLoggedIn, setProfile } = useAuth();

    const [phone, setPhone] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConpassword] = useState("");
    const [address, setAddress] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(phone, fname, lname, password, conPassword, address)) {
            notify("กรอกข้อมูลให้ครบถ้วน", "error");
            return;
        };
        if (isNaN(phone) || phone.length !== 10) {
            notify("เบอร์โทรศัพท์ไม่ถูกต้อง", "error");
            return;
        };
        if (password !== conPassword) {
            notify("รหัสผ่านไม่ตรงกัน", "error");
            return;
        };

        try {
            const ip = await axios.get("https://geolocation-db.com/json/");
            const registerRes = await axios.post("/auth/register", {
                phone,
                fname,
                lname,
                pass: password,
                confirmPass: conPassword,
                address,
                ip: ip?.data?.IPv4
            });

            if (registerRes.status === 204) {
                const loginRes = await axios.post("/auth/login", {
                    phone,
                    password,
                });
                
                if (loginRes.data.status === "success") {
                    localStorage.setItem("AUTH", loginRes.data.token);
                    localStorage.setItem("RE_A", loginRes.data.refreshToken);
                    setProfile(loginRes.data.data[0]);
                    setLoggedIn(true);
                    navigate("/");
                } else {
                    notify("ไม่สามารถเข้าสู่ระบบได้", "error");
                };
                setPhone("");
                setFname("");
                setPassword("");
                setConpassword("");
                setAddress("");
            } else {
                notify("ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่", "error");
            }
        } catch(err) {
            if (err?.response) {
                notify(
                    err?.response?.data?.message 
                        ? err?.response?.data?.message 
                        : "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่", 
                    "error"
                );
            } else {
                notify("ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่", "error");
            };
        }
    }

    return (
        <section className="form__sign__container mx-auto">
            <h1 className="text-center font-bold text-gray-500 py-10 text-xl">
                Account SignUp
            </h1>
            <div className="bg-gray-100 rounded-lg w-full sm:w-1/2 m-auto pl-10 pr-10 pt-14 pb-14">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Phone number"
                        className="sign__form"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="mt-5 grid sm:grid-cols-2 gap-8">
                        <input
                            type="text"
                            placeholder="First name"
                            className="sign__form"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="sign__form"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </div>
                    <div className="mt-5 grid sm:grid-cols-2 gap-8">
                        <input
                            type="password"
                            placeholder="Password"
                            className="sign__form"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="sign__form"
                            value={conPassword}
                            onChange={(e) => setConpassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <input
                            type="text"
                            placeholder="Address"
                            className="sign__form"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="w-full mt-10 text-center">
                        <button
                            type="submit"
                            className="py-3 w-36 text-base font-bold rounded-lg bg-black text-white opacity-90 duration-300"
                        >
                            SIGN UP
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-blue-400">Login</Link></p>
            </div>
            <ToastContainer />
        </section>
    );
}

export default Register;

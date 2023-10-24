import Home from "./components/Home/Home";
import FlashSale from "./components/FlashSale/FlashSale";
import AllProduct from "./components/AllProduct/AllProduct";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import Shop from "./components/Shop/Shop";
import Product from "./components/Product/Product";
import NotFound from "./components/404/404";
import useAuth from "./hooks/useAuth";
import Profile from "./components/Account/Profile";
import Wishlist from "./components/Account/Wishlist";
import Checkout from "./components/Checkout/Checkout";

function App() {
    const { loggedIn } = useAuth();

    return (
        <>
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <>
                                <Home />
                                {/* <FlashSale /> */}
                                <AllProduct />
                            </>
                        }
                    ></Route>
                    <Route path="/shop" element={<Navigate to="/" />}></Route>
                    <Route path="/shop/:category" element={<Shop />}></Route>
                    <Route path="/shop/:category/:brand" element={<Shop />}></Route>
                    <Route path="/product/:id" element={<Product />}></Route>
                    <Route path="/account/profile" element={!loggedIn ? <Navigate to="/login" /> : <Profile />}></Route>
                    <Route path="/account/wishlist" element={!loggedIn ? <Navigate to="/login" /> : <Wishlist />}></Route>
                    <Route path="/cart/checkout" element={!loggedIn ? <Navigate to="/login" /> : <Checkout />}></Route>

                    <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />}></Route>
                    <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register />}></Route>
                </Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    );
}

export default App;

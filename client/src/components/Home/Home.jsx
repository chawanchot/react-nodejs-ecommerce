import React from "react";
import "./Home.css";
import Category from "../Category/Category";
import HomeSlides from "./HomeSlides";

function Home() {
    return (
        <div className="home__container flex justify-between flex-col lg:flex-row">
            <Category style={{ height: "500px" }}/>
            <HomeSlides />
        </div>
    );
}

export default Home;

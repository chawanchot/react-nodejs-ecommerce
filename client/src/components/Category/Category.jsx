import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import axios from "../../services/axios";

function Category({ style }) {
    const [menuItem, setMenuItem] = useState([]);

    useEffect(() => {
        axios
            .get("/category")
            .then((resp) => {
                setMenuItem(resp.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="cate_container shadow text-gray-500 rounded overflow-auto" style={style}>
            <h4 className="text-center mt-2 font-bold text-xl py-2">Categories</h4>
            <hr />
            {menuItem.map((item, index) => {
                return (
                    <Link
                        to={`/shop/${item.name.trim().toLowerCase()}`}
                        className="mt-3 flex items-center py-1 px-4 duration-500 hover:bg-zinc-200 cursor-pointer"
                        key={index}
                    >
                        <img src={item.img} alt={item.name} className="w-8 h-8 object-cover" />
                        <span className="ml-2 text-base">{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}

export default Category;

import React from "react";
import { Link } from "react-router-dom";
import "./BrandCategory.css";

function BrandCategory({ style, data }) {
    return (
        <div className="brandcate_container shadow text-gray-500 rounded overflow-auto pb-3" style={style}>
            <h4 className="text-center mt-2 font-bold text-xl py-2">Brand</h4>
            <hr />
            {data.map((item, index) => {
                return (
                    <Link
                        to={`/shop/${item.category.toLowerCase()}/${item.name}`}
                        className="mt-3 flex items-center py-1 px-4 duration-500 hover:bg-zinc-200 cursor-pointer"
                        key={index}
                    >
                        <span>{item.name.toUpperCase()}</span>
                    </Link>
                );
            })}
        </div>
    );
}

export default BrandCategory;

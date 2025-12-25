import React from "react";
import LayoutStyles from "../LayoutStyles.module.css";

const Body = function({ children }) {
    return (
        <>
            <div className={LayoutStyles.BodyContainer}>
                {children}
            </div>
        </>
    );
}
export default Body;
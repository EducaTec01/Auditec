import React from "react";
import "./DropDownProfile.scss";
import { Link } from "react-router-dom";
import Single from "../../pages/single/Single";

const DropDownProfile = () => {
    return (
        <div className="flex flex-col dropDownProfile">
            <ul className="flex flex-col gap-4">
                <Link to="/single" style={{ textDecoration: "none" }}>
                    <li>Profile</li>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <li>Logout</li>
                </Link>
            </ul>
        </div>
    )
}

export default DropDownProfile 
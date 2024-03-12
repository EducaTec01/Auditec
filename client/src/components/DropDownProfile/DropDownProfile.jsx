import React from "react";
import "./DropDownProfile.scss";

const DropDownProfile = () => {
    return (
        <div className="flex flex-col dropDownProfile">
            <ul className="flex flex-col gap-4">
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </div>
    )
}

export default DropDownProfile 
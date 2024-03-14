import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import DropDownProfile from "../DropDownProfile/DropDownProfile";
import Single from "../../pages/single/Single";


const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [openProfile, setOpenProfile] = useState(false);

  const handleProfileClick = () => {
    setOpenProfile(prevState => !prevState);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className=" ">
          
        </div>
        <div className="items">
          <div className="item">
              <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
            <div className="item profile-item">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
                onClick={handleProfileClick}
              />
              {openProfile && <DropDownProfile />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
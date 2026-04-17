import React from "react";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  const getTitle = () => {
    if (user?.role === "ADMIN") return "Admin Dashboard";
    if (user?.role === "VENDOR") return "Vendor Dashboard";
    if (user?.role === "SALES") return "Sales Dashboard";
    return "Dashboard";
  };

  return (
    <div className="topbarbox">
      {/* <div className="d-flex align-items-center gap-2"> 
        <h2 className="topbar-title">{getTitle()}</h2>

      </div> */}

      
        <div className="logo"> <img src={  "../images/logo.png"} alt="Logo" height={44} /> </div>

        {/* User Info */}
        {/* <div className="user-info">
          <div className="avatar">
            {user?.name?.charAt(0) || "U"}
          </div>
          <span className="username">{user?.name}</span>
        </div> */}

         {/* Mobile Menu Button */}
         <div className="topright">
          <button className="bell-btn mobileshow">
          <img src={  "../images/icons/bell.png"} alt="menu" width={26} />
        </button> 
        <button className="menu-btn mobileshow" onClick={onMenuClick}>
          <img src={  "../images/icons/menu.png"} alt="menu" width={34} />
        </button>
         </div>

        {/* Logout */}
        {/* <button className="logout-btn" onClick={logout}>
          <LogOut size={18} />
        </button> */}

      
    </div>
  );
}
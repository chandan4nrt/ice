import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  CalendarDays,
  Wallet2,
  ClipboardList,
  Package,
  User
} from "lucide-react";

export default function BottomNav({ user, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= MENU DATA ================= */

  const adminItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/admin/dashboard" },
    { id: "students", label: "Students", icon: <Users size={20} />, path: "/admin/students" },
    { id: "events", label: "Events", icon: <CalendarDays size={20} />, path: "/admin/add-event" },
    { id: "payments", label: "Payments", icon: <Wallet2 size={20} />, path: "/admin/payment-history" },
  ];

  const vendorItems = [
    { id: "dashboard", label: "Dashboard", icon: "/images/icons/home.png", path: "/vendor/dashboard" },
    { id: "retailer", label: "Orders", icon: "/images/icons/clock.png", path: "/vendor/retailer-order" },
    { id: "stock", label: "Stock", icon: "/images/icons/booking.png", path: "/vendor/stock-ledger", class:"bookings", width:34, height:34 },
    { id: "history", label: "History", icon: "/images/icons/history.png", path: "/vendor/incoming-stocks" },
    { id: "profile", label: "Profile", icon: "/images/icons/user.png", path: "/vendor/profile" },
  ];

  // const salesItems = [
  //   { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/sales/dashboard" },
  //   { id: "orders", label: "Orders", icon: <ClipboardList size={20} />, path: "/sales/orders" },
  //   { id: "customers", label: "Customers", icon: <Users size={20} />, path: "/sales/customers" },
  //   { id: "profile", label: "Profile", icon: <User size={20} />, path: "/sales/profile" },
  // ];

  /* ================= ROLE BASED MENU ================= */

  let menuItems = [];

  if (user?.primaryRole === "ADMIN") {
    menuItems = adminItems;
  } else if (user?.primaryRole === "VENDOR") {
    menuItems = vendorItems;
  } 
  // else if (user?.primaryRole === "SALESMAN") {
  //   menuItems = salesItems;
  // }

  /* ================= RENDER ================= */

  return (
    <nav className="bottom-nav"> 
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <button key={item.id} type="button" onClick={() => { navigate(item.path);
              if (onClose) onClose(); }}  className={`navbtn ${item?.class ?? ""} ${ isActive ? "active" : "" }`}> 
              {typeof item.icon === "string" ? (
                <img src={item.icon} alt={item.label} width={item.width || 24} height={item.height || 24}  />
              ) : (
                item.icon
              )} 
              {/* <span className="small mt-1">{item.label}</span> */} 
          </button>
          );
        })} 
    </nav>
  );
}
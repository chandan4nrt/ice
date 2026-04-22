import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../css/Sidebar.css";
import { useAuth } from "../context/AuthContext";
import { ChevronRight } from "lucide-react";
import { STATIC_ROUTES } from "../Routes/StaticRoutes";

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  const roleString = user?.primaryRole?.toUpperCase();
  const menuItems = (roleString && STATIC_ROUTES[roleString]) ? STATIC_ROUTES[roleString] : [];

  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  /* ================= MENU DATA ================= */
  // const adminItems = [
  //   { id: "admin-dashboard", path: "/admin/dashboard", label: "Dashboard" },
  //   { id: "admin-users", path: "/admin/users", label: "Users" },
  //   { id: "admin-settings", path: "/admin/settings", label: "Settings" },
  //   { id: "add-vendor", path: "/admin/add-vendor", label: "Add Vendor" },
  //   {
  //     id: "business-details",
  //     path: "/admin/business-details",
  //     label: "Business Details",
  //   },
  //   {
  //     id: "kyc-verification",
  //     path: "/admin/kyc-verification",
  //     label: "KYC Verification",
  //   },
  //   { id: "bank-details", path: "/admin/bank-details", label: "Bank Details" },
  //   {
  //     id: "location-verification",
  //     path: "/admin/location-verification",
  //     label: "Location Verification",
  //   },
  //   {
  //     id: "review-submit",
  //     path: "/admin/review-submit",
  //     label: "Review Submit",
  //   },
  // ];

  // const vendorItems = [
  //   {
  //     id: "vendor-dashboard",
  //     path: "/vendor/dashboard",
  //     label: "Vendor Dashboard",
  //   },
  //   {
  //     id: "vendor-retailer",
  //     path: "/vendor/retailer-order",
  //     label: "Retailer Order",
  //   },
  //   {
  //     id: "vendor-create-retailer",
  //     path: "/vendor/create-retailer-order",
  //     label: "Create Retailer Order",
  //   },
  //   {
  //     id: "vendor-replenishment",
  //     path: "/vendor/create-replenishment-order",
  //     label: "Create Replenishment Order",
  //   },
  //   { id: "vendor-stock", path: "/vendor/stock-ledger", label: "Stock Ledger" },
  //   {
  //     id: "vendor-incoming",
  //     path: "/vendor/incoming-stocks",
  //     label: "Incoming Stocks",
  //   },
  //   { id: "home", path: "/vendor/home", label: "Home" },
  //   { id: "company", path: "/vendor/company", label: "Company" },
  //   { id: "why-iceberg", path: "/vendor/why-iceberg", label: "Why Iceberg" },
  //   { id: "products", path: "/vendor/products", label: "Products" },
  //   { id: "where", path: "/vendor/where", label: "Where" },
  // ];

  // const salesItems = [
  //   {
  //     id: "sales-dashboard",
  //     path: "/sales/dashboard",
  //     label: "Sales Dashboard",
  //   },
  //   { id: "sales-orders", path: "/sales/orders", label: "Orders" },
  //   { id: "sales-customers", path: "/sales/customers", label: "Customers" },
  //   { id: "sales-profile", path: "/sales/profile", label: "Profile" },
  // ];

  // const filterMenuByRole = (items, role) => {
  //   return items
  //     .filter((item) => {
  //       if (!item.allowedRoles) return true;
  //       return item.allowedRoles.includes(role);
  //     })
  //     .map((item) => {
  //       if (item.children) {
  //         return {
  //           ...item,
  //           children: filterMenuByRole(item.children, role),
  //         };
  //       }
  //       return item;
  //     })
  //     .filter((item) => !item.children || item.children.length > 0);
  // };

  // let menuItems = [];

  // if (user?.primaryRole === "ADMIN") {
  //   menuItems = adminItems;
  // } else if (user?.primaryRole === "VENDOR") {
  //   menuItems = vendorItems;
  // } else if (user?.primaryRole === "SALES") {
  //   menuItems = salesItems;
  // }

  const MenuItem = ({ item, level = 0, onClose }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.id];
    const isChildActive = item.children?.some(
      (child) => location.pathname === child.path,
    );

    return (
      <li
        className={`menu-item level-${level} ${isOpen || isChildActive ? "active" : ""}`}
      >
        {hasChildren ? (
          <>
            <div
              className="menu-link submenu-toggle"
              onClick={() => toggleMenu(item.id)}
            >
              <span>{item.label}</span>
              <span
                className={`arrow ${isOpen || isChildActive ? "open" : ""}`}
              >
                <ChevronRight size={16} />
              </span>
            </div>
            {(isOpen || isChildActive) && (
              <ul className="submenu">
                {item.children.map((child) => (
                  <MenuItem
                    key={child.id}
                    item={child}
                    level={level + 1}
                    onClose={onClose}
                  />
                ))}
              </ul>
            )}
          </>
        ) : (
          <NavLink
            to={item.path}
            className="menu-link"
            onClick={() => {
              toggleMenu(item.id);
              onClose();
            }}
          >
            <span>{item.label}</span>
          </NavLink>
        )}
      </li>
    );
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <aside className={`sidebar-drawer ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="user-info">
            <div className="avatar">{user?.name?.charAt(0) || "U"}</div>
            <div>
              <h4>{user?.name || "User"}</h4>
              <p>
                {user?.primaryRole === "ADMIN"
                  ? "Administrator"
                  : user?.primaryRole === "VENDOR"
                    ? "Vendor"
                    : user?.primaryRole === "SALES"
                      ? "Sales"
                      : "User"}
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <nav className="sidebar-menu">
          <ul>
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} onClose={onClose} />
            ))}
            <li className={`menu-item`}>
              <button className="menu-link" onClick={logout}>
                <span>{"Logout"}</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <aside className="desktop-sidebar">
        <div className="userinfo">
          <img src={"../images/logo.png"} alt="Logo" />
        </div>
        <nav className="sidebar-menu">
          <ul>
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} onClose={onClose} />
            ))}
            <li className={`menu-item`}>
              <button className="menu-link" onClick={logout}>
                <span>{"Logout"}</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}


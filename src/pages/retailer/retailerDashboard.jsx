import { useOutletContext, useNavigate } from "react-router-dom";
import "../../css/dashboard.css";
import { useAuth } from "../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import OrderCard from "../../components/OrderCard";

// ── Mock data — replace with real API hooks when ready ──────────────────────
const mockOrders = [
  {
    id: "ORD58475",
    date: "Tuesday, 23 April, 10:32 AM",
    items: 3,
    qty: 15,
    status: "Completed",
    icon: "../images/icons/request.png",
  },
  {
    id: "ORD78459",
    date: "Monday, 22 April, 12:52 PM",
    items: 4,
    qty: 52,
    status: "In Process",
    icon: "../images/icons/request.png",
  },
  {
    id: "ORD68485",
    date: "Saturday, 19 April, 02:32 PM",
    items: 2,
    qty: 24,
    status: "Rejected",
    icon: "../images/icons/request.png",
  },
  {
    id: "ORD22547",
    date: "Friday, 18 April, 04:56 PM",
    items: 2,
    qty: 36,
    status: "Completed",
    icon: "../images/icons/request.png",
  },
];

const mockStats = {
  totalOrders: 142,
  pendingOrders: 18,
  completedOrders: 116,
  dueAmount: 24500,
};

// ── Notification/reminder mock — replace with real API ──────────────────────
const mockNotification = {
  count: 1,
  message: "Order Awaiting Your Confirmation",
  sub: "Distributor has adjusted item quantities due to stock shortage. Tap to review.",
  orderId: "ORD78459",
};

export default function RetailerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const outlet = useOutletContext();
  const openSidebar = outlet?.openSidebar;

  // Replace with real hooks:
  // const { data: stats } = useGetRetailerStats();
  // const { data: orders } = useGetRetailerOrders();
  // const { data: notification } = useGetPendingNotification();
  const stats = mockStats;
  const orders = mockOrders;
  const notification = mockNotification;

  return (
    <>
      <div className="mainpro">
        <div className="container">
          <div className="dashboard">
            {/* ── HEADER ── */}
            <div className="header">
              <div>
                <h1>
                  {user?.name || user?.fullName || user?.username || "Welcome"}
                </h1>
                <p>{today}</p>
              </div>
              <img
                className="profile"
                src={
                  user?.profileImage ||
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || user?.fullName || "User",
                  )}&background=random`
                }
                alt="Profile"
              />
            </div>

            {/* ── STATS (4 equal cards) ── */}
            <div
              className="vendor-stats"
              style={{
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {/* 1 — Total Orders */}
              <div className="darkbox" style={statCardStyle}>
                <p style={statLabelStyle}>TOTAL ORDERS</p>
                <h3 style={{ ...statValueStyle, color: "#4fc3f7" }}>
                  {stats.totalOrders}
                </h3>
                <span style={statSubStyle}>This month</span>
              </div>

              {/* 2 — Delivered */}
              <div className="darkbox" style={statCardStyle}>
                <p style={statLabelStyle}>DELIVERED</p>
                <h3 className="limecolor" style={statValueStyle}>
                  {stats.completedOrders}
                </h3>
                <span style={statSubStyle}>
                  {Math.round(
                    (stats.completedOrders / stats.totalOrders) * 100,
                  )}
                  %
                </span>
              </div>

              {/* 3 — Pending */}
              <div className="darkbox" style={statCardStyle}>
                <p style={statLabelStyle}>PENDING</p>
                <h3 style={{ ...statValueStyle, color: "#ffe082" }}>
                  {stats.pendingOrders}
                </h3>
                <span style={statSubStyle}>Need review</span>
              </div>

              {/* 4 — Total Spent */}
              <div className="darkbox" style={statCardStyle}>
                <p style={statLabelStyle}>TOTAL SPENT</p>
                <h3 style={{ ...statValueStyle, color: "#ff8a80" }}>
                  ₹{(stats.dueAmount / 1000).toFixed(1)}K
                </h3>
                <span style={statSubStyle}>All vendors</span>
              </div>
            </div>

            {/* ── OFFER CAROUSEL (Swiper) ── */}
            <div className="slider">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
              >
                <SwiperSlide>
                  <div className="slide">
                    <img src="../images/banner/banner.jpg" alt="offer" />
                    <div className="sliderText">
                      <h3>Drop an Iceberg. Elevate Your Drink.</h3>
                      <p>Experience Ice With an Edge.</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide">
                    <img src="../images/banner/banner.jpg" alt="offer" />
                    <div className="sliderText">
                      <h3>Bulk Order Bonus.</h3>
                      <p>Get 10% off on 50+ boxes.</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide">
                    <img src="../images/banner/banner.jpg" alt="offer" />
                    <div className="sliderText">
                      <h3>New Flavors In.</h3>
                      <p>Experience Ice With an Edge.</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* ── NOTIFICATION / REMINDER BANNER ── */}
            {notification && (
              <div
                onClick={() => navigate("/orders")}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,160,0,0.15), rgba(255,111,0,0.10))",
                  border: "1px solid rgba(255,160,0,0.35)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  cursor: "pointer",
                  marginBottom: "16px",
                }}
              >
                {/* Bell icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255,160,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffa000"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#ffa000",
                    }}
                  >
                    {notification.count} {notification.message}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.4,
                    }}
                  >
                    {notification.sub}
                  </p>
                </div>

                {/* Chevron */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: 10 }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            )}

            {/* ── ALL ORDERS (with View All → /orders) ── */}
            <div className="orders" style={{ marginTop: "8px" }}>
              <div className="ordersHeader">
                <h3>Your Orders</h3>
                <span
                  className="text-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("../pages/retailer/orderList")}
                >
                  View All
                </span>
              </div>
              {orders.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Shared stat-card styles for uniform sizing ───────────────────────────────
const statCardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  minHeight: 95,
  gap: 4,
};

const statLabelStyle = {
  margin: 0,
  fontSize: 10,
  color: "rgba(255,255,255,0.45)",
  fontWeight: 600,
  letterSpacing: 0.8,
  textTransform: "uppercase",
};

const statValueStyle = {
  margin: "4px 0 2px",
  fontSize: 32,
  fontWeight: 800,
  lineHeight: 1,
};

const statSubStyle = {
  fontSize: 11,
  color: "rgba(255,255,255,0.38)",
  display: "block",
  marginTop: 2,
};

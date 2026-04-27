import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/popup.css";
import { useNavigate } from "react-router-dom";

// ── Mock data — replace with real API hooks ───────────────────────────────────
const mockStats = {
  totalOrders: 925,
  inOrders: 260,
  unpaid: 127,
  completed: 538,
};

const mockOrders = [
  {
    id: 45848427,
    businessName: "TEN 11 Restaurant & Bar",
    date: "24 Feb 2026",
    status: "In Orders",
    payment: "Pending",
    products: [{ name: "ice cube 1", price: 30, qty: 10, total: 300 }],
    grandTotal: 300,
    discount: 0,
    balance: 21,
    debt: -1790,
    customerLabel: "cust1",
    // Stock alert: vendor can only ship 8 of the 10 ordered
    stockAlert: {
      vendorMessage:
        "Only 8 units of ice cube 1 available in stock right now. Can ship remaining 2 units in 2 weeks.",
      ordered: 10,
      orderedTotal: 300,
      canShip: 8,
      canShipTotal: 240,
      product: "ice cube 1",
    },
  },
  {
    id: 45848428,
    businessName: "GRAVITY Lounge",
    date: "24 Feb 2026",
    status: "Completed",
    payment: "Paid",
    products: [{ name: "ice cube 2", price: 50, qty: 5, total: 250 }],
    grandTotal: 250,
    discount: 10,
    balance: 100,
    debt: 0,
    customerLabel: "cust2",
    stockAlert: null,
  },
  {
    id: 45848429,
    businessName: "Skyscape Bar & Lounge",
    date: "24 Feb 2026",
    status: "Unpaid",
    payment: "Overdue",
    products: [{ name: "ice cube 1", price: 30, qty: 20, total: 600 }],
    grandTotal: 600,
    discount: 0,
    balance: 0,
    debt: -600,
    customerLabel: "cust3",
    stockAlert: null,
  },
  {
    id: 45848430,
    businessName: "Maurya Store",
    date: "24 Feb 2026",
    status: "In Process",
    payment: "Pending",
    products: [{ name: "ice cube 3", price: 80, qty: 8, total: 640 }],
    grandTotal: 640,
    discount: 20,
    balance: 50,
    debt: 0,
    customerLabel: "cust4",
    stockAlert: null,
  },
];

const ALL_TABS = ["All", "In Orders", "Completed", "Unpaid", "In Process"];

const trackSteps = [
  "Pending",
  "Approved",
  "Rejected",
  "Dispatched",
  "Delivered",
];

// ── Color maps ────────────────────────────────────────────────────────────────
const statusStyle = {
  "In Orders": {
    bg: "rgba(245,158,11,0.15)",
    text: "#fbbf24",
    border: "rgba(251,191,36,0.3)",
  },
  Completed: {
    bg: "rgba(16,185,129,0.15)",
    text: "#34d399",
    border: "rgba(52,211,153,0.3)",
  },
  Unpaid: {
    bg: "rgba(59,130,246,0.15)",
    text: "#60a5fa",
    border: "rgba(96,165,250,0.3)",
  },
  "In Process": {
    bg: "rgba(139,92,246,0.15)",
    text: "#c084fc",
    border: "rgba(192,132,252,0.3)",
  },
  Pending: {
    bg: "rgba(245,158,11,0.15)",
    text: "#fbbf24",
    border: "rgba(251,191,36,0.3)",
  },
};

const paymentStyle = {
  Paid: {
    bg: "rgba(16,185,129,0.15)",
    text: "#34d399",
    border: "rgba(52,211,153,0.3)",
  },
  Pending: {
    bg: "rgba(245,158,11,0.15)",
    text: "#fbbf24",
    border: "rgba(251,191,36,0.3)",
  },
  Overdue: {
    bg: "rgba(239,68,68,0.15)",
    text: "#f87171",
    border: "rgba(248,113,113,0.3)",
  },
};

// ── Generic pill badge ────────────────────────────────────────────────────────
function Badge({ label, styleMap }) {
  const s = styleMap[label] || {
    bg: "rgba(255,255,255,0.08)",
    text: "rgba(255,255,255,0.55)",
    border: "rgba(255,255,255,0.12)",
  };
  return (
    <span
      style={{
        display: "inline-block",
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 20,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── Stock Adjustment Modal (SS2) ──────────────────────────────────────────────
function StockAdjustModal({ order, onClose, onAccept, onReject }) {
  const a = order.stockAlert;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#181c27",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 18,
          padding: "24px 22px",
          width: "100%",
          maxWidth: 460,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: 8,
            width: 30,
            height: 30,
            cursor: "pointer",
            color: "rgba(255,255,255,0.6)",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "rgba(245,158,11,0.15)",
              border: "1px solid rgba(245,158,11,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            ⚠️
          </div>
          <div>
            <p
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "#fff",
                margin: 0,
              }}
            >
              Stock Adjustment from Vendor
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                margin: "3px 0 0",
              }}
            >
              #{order.id} · {order.businessName}
            </p>
          </div>
        </div>

        {/* Vendor message */}
        <div
          style={{
            background: "rgba(180,50,40,0.18)",
            border: "1px solid rgba(220,70,60,0.3)",
            borderRadius: 10,
            padding: "12px 14px",
            marginBottom: 16,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: "#f87171",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 6px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>🧾</span> VENDOR MESSAGE
          </p>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            {a.vendorMessage}
          </p>
        </div>

        {/* Comparison boxes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {/* Original order */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 10,
              padding: "14px",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0 0 10px",
              }}
            >
              ORIGINAL ORDER
            </p>
            <p style={{ margin: "0 0 3px" }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                {a.ordered}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  marginLeft: 5,
                }}
              >
                units
              </span>
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 8px",
              }}
            >
              ₹{a.orderedTotal}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#f87171",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              ✗ Not fully available
            </p>
          </div>

          {/* Vendor can ship */}
          <div
            style={{
              background: "rgba(16,185,129,0.07)",
              border: "1px solid rgba(52,211,153,0.22)",
              borderRadius: 10,
              padding: "14px",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#34d399",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0 0 10px",
              }}
            >
              VENDOR CAN SHIP
            </p>
            <p style={{ margin: "0 0 3px" }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                {a.canShip}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  marginLeft: 5,
                }}
              >
                units
              </span>
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 8px",
              }}
            >
              ₹{a.canShipTotal}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#34d399",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              ✓ Available now
            </p>
          </div>
        </div>

        {/* Product adjustment row */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
            {a.product}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 12,
                color: "#f87171",
                textDecoration: "line-through",
                fontWeight: 600,
              }}
            >
              {a.ordered} units
            </span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>→</span>
            <span style={{ fontSize: 13, color: "#34d399", fontWeight: 700 }}>
              {a.canShip} units
            </span>
          </span>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <button
            onClick={() => onAccept(order)}
            style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              border: "none",
              borderRadius: 10,
              padding: "13px 8px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 14px rgba(22,163,74,0.3)",
            }}
          >
            ✅ Accept {a.canShip} Units
          </button>
          <button
            onClick={() => onReject(order)}
            style={{
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              border: "none",
              borderRadius: 10,
              padding: "13px 8px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 14px rgba(220,38,38,0.3)",
            }}
          >
            ❌ Reject & Cancel
          </button>
        </div>

        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.28)",
            textAlign: "center",
            margin: 0,
          }}
        >
          Accepting will update the order quantity and recalculate the invoice.
        </p>
      </div>
    </div>
  );
}

// ── Track Order Popup ─────────────────────────────────────────────────────────
function TrackPopup({ order, onClose }) {
  const activeIndex = 0; // replace with real step from API
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "24px 20px",
          width: "100%",
          maxWidth: 340,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            color: "#374151",
          }}
        >
          ✕
        </button>

        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#111",
            margin: "0 0 4px",
          }}
        >
          {order.businessName}
        </p>
        <p style={{ fontSize: 12, color: "#4fc3f7", margin: "0 0 20px" }}>
          Order Id: {order.id}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {trackSteps.map((step, i) => {
            const isActive = i === activeIndex;
            const isDone = i < activeIndex;
            return (
              <div
                key={step}
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `2px solid ${isActive || isDone ? "#1565c0" : "#d1d5db"}`,
                      background: isDone ? "#1565c0" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isDone && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2.5 2.5L8 3"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {isActive && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#1565c0",
                        }}
                      />
                    )}
                  </div>
                  {i < trackSteps.length - 1 && (
                    <div
                      style={{
                        width: 2,
                        height: 28,
                        background: isDone ? "#1565c0" : "#e5e7eb",
                        margin: "2px 0",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    paddingTop: 1,
                    paddingBottom: i < trackSteps.length - 1 ? 20 : 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#111" : "#6b7280",
                      margin: 0,
                    }}
                  >
                    {step}
                  </p>
                  {isActive && (
                    <p
                      style={{
                        fontSize: 11,
                        color: "#4fc3f7",
                        margin: "2px 0 0",
                      }}
                    >
                      24 Feb 2026, 9:30 AM
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function OrderList() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date("2026-02-24"));
  const [activeTab, setActiveTab] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [trackOrder, setTrackOrder] = useState(null);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  // Replace with real hooks:
  // const { data: stats } = useGetRetailerOrderStats();
  // const { data: orders } = useGetRetailerOrders(selectedDate);
  const stats = mockStats;
  const orders = mockOrders;

  const alertOrders = orders.filter(
    (o) => o.stockAlert && !dismissedAlerts.includes(o.id),
  );

  const filteredOrders =
    activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

  const toggleRow = (id) => setExpandedId((prev) => (prev === id ? null : id));

  const handleAccept = (order) => {
    setDismissedAlerts((p) => [...p, order.id]);
    setReviewOrder(null);
    // TODO: call API to accept adjusted quantity
  };

  const handleReject = (order) => {
    setDismissedAlerts((p) => [...p, order.id]);
    setReviewOrder(null);
    // TODO: call API to reject & cancel order
  };

  return (
    <>
      <div className="mainpro">
        <div className="container">
          {/* ── Page header ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 3px",
                  letterSpacing: "-0.02em",
                }}
              >
                Orders
              </h1>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  margin: 0,
                }}
              >
                Track all purchase orders with your vendors
              </p>
            </div>
            <button
              onClick={() => navigate("/retailer/create-orders")}
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                border: "none",
                borderRadius: 10,
                padding: "10px 18px",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
              }}
            >
              + Create Order
            </button>
          </div>

          {/* ── Stats bar ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {[
              {
                label: "Total Orders",
                value: stats.totalOrders,
                color: "#fff",
              },
              { label: "In Orders", value: stats.inOrders, color: "#fbbf24" },
              { label: "Unpaid", value: stats.unpaid, color: "#86efac" },
              { label: "Completed", value: stats.completed, color: "#6ee7b7" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="darkbox"
                style={{ textAlign: "center", padding: "10px 6px" }}
              >
                <p
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.45)",
                    margin: "0 0 4px",
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </p>
                <p style={{ fontSize: 18, fontWeight: 800, color, margin: 0 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Vendor Stock Adjustments banner ── */}
          {alertOrders.length > 0 && (
            <div
              style={{
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.28)",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 15 }}>🔔</span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24" }}
                >
                  Vendor Stock Adjustments — Action Required
                </span>
              </div>

              {alertOrders.map((o) => (
                <div
                  key={o.id}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 8,
                    padding: "11px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#f59e0b",
                        }}
                      >
                        #{o.id}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.65)",
                        }}
                      >
                        {o.businessName}
                      </span>
                    </div>
                    <span
                      style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}
                    >
                      Ordered{" "}
                      <strong style={{ color: "#fff" }}>
                        {o.stockAlert.ordered}
                      </strong>
                      {" → Vendor can ship "}
                      <strong style={{ color: "#34d399" }}>
                        {o.stockAlert.canShip}
                      </strong>
                      {" units"}
                    </span>
                  </div>
                  <button
                    onClick={() => setReviewOrder(o)}
                    style={{
                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      boxShadow: "0 3px 10px rgba(245,158,11,0.3)",
                    }}
                  >
                    Review & Confirm
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Date filter ── */}
          <div
            className="darkbox"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
              width: "fit-content",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <DatePicker
              selected={selectedDate}
              onChange={(d) => setSelectedDate(d)}
              dateFormat="dd MMM yyyy"
              className="datepicker-input"
              style={{ background: "transparent" }}
            />
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* ── Filter Tabs ── */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            {ALL_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background:
                    activeTab === tab
                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                      : "rgba(255,255,255,0.06)",
                  border:
                    activeTab === tab
                      ? "none"
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  padding: "7px 14px",
                  color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  fontWeight: activeTab === tab ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Orders Table ── */}
          <div className="darkbox" style={{ padding: 0, overflow: "hidden" }}>
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 100px 110px 150px 90px 40px",
                padding: "10px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                gap: 8,
              }}
            >
              {[
                "ORDER ID",
                "VENDOR",
                "TOTAL",
                "DATE",
                "STATUS",
                "PAYMENT",
                "",
              ].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <div
                style={{
                  padding: "36px 18px",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 13,
                }}
              >
                No orders found for this filter.
              </div>
            )}

            {filteredOrders.map((order) => {
              const isExpanded = expandedId === order.id;
              return (
                <div key={order.id}>
                  {/* Row */}
                  <div
                    onClick={() => toggleRow(order.id)}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "140px 1fr 100px 110px 150px 90px 40px",
                      padding: "14px 18px",
                      gap: 8,
                      alignItems: "center",
                      cursor: "pointer",
                      borderBottom: isExpanded
                        ? "none"
                        : "1px solid rgba(255,255,255,0.05)",
                      background: isExpanded
                        ? "rgba(245,158,11,0.04)"
                        : "transparent",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded)
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.025)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {/* Order ID */}
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#f59e0b",
                      }}
                    >
                      #{order.id}
                    </span>

                    {/* Vendor */}
                    <span
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.85)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.businessName}
                    </span>

                    {/* Total */}
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}
                    >
                      ₹{order.grandTotal.toLocaleString()}
                    </span>

                    {/* Date */}
                    <span
                      style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}
                    >
                      {order.date}
                    </span>

                    {/* Status */}
                    <div>
                      <Badge label={order.status} styleMap={statusStyle} />
                    </div>

                    {/* Payment */}
                    <div>
                      <Badge label={order.payment} styleMap={paymentStyle} />
                    </div>

                    {/* Chevron */}
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2.5"
                        style={{
                          transition: "transform 0.2s",
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        padding: "16px 18px",
                      }}
                    >
                      {/* Product table header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 11,
                          color: "rgba(255,255,255,0.38)",
                          padding: "0 0 8px",
                          borderBottom: "1px solid rgba(255,255,255,0.08)",
                          marginBottom: 2,
                        }}
                      >
                        <span>Product</span>
                        <span>Quantity</span>
                        <span>Total price</span>
                      </div>

                      {/* Product rows */}
                      {order.products.map((p, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            padding: "10px 0",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#fff",
                                margin: 0,
                              }}
                            >
                              {p.name}
                            </p>
                            <p
                              style={{
                                fontSize: 11,
                                color: "rgba(255,255,255,0.38)",
                                margin: "2px 0 0",
                              }}
                            >
                              ₹{p.price}
                            </p>
                          </div>
                          <span style={{ fontSize: 13, color: "#fff" }}>
                            {p.qty}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#fff",
                            }}
                          >
                            ₹{p.total}
                          </span>
                        </div>
                      ))}

                      {/* Totals */}
                      <div style={{ paddingTop: 12 }}>
                        {[
                          {
                            label: "Grand total price",
                            value: `₹${order.grandTotal}`,
                          },
                          {
                            label: "Total discount",
                            value: `₹${order.discount}`,
                          },
                          {
                            label: `${order.customerLabel}'s balance`,
                            value: `₹${order.balance}`,
                          },
                          {
                            label: `${order.customerLabel}'s debt`,
                            value: `₹${order.debt}`,
                            red: order.debt < 0,
                          },
                        ].map(({ label, value, red }) => (
                          <div
                            key={label}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 12,
                              marginBottom: 6,
                            }}
                          >
                            <span style={{ color: "rgba(255,255,255,0.45)" }}>
                              {label}
                            </span>
                            <span
                              style={{
                                color: red ? "#ff8a80" : "#fff",
                                fontWeight: 600,
                              }}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Track button */}
                      <button
                        className="add-btn"
                        style={{
                          width: "100%",
                          marginTop: 10,
                          justifyContent: "center",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTrackOrder(order);
                        }}
                      >
                        Track Order
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => navigate("/retailer/create-order")}
        style={{
          position: "fixed",
          bottom: 90,
          right: 20,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1565c0, #0d47a1)",
          border: "none",
          color: "#fff",
          fontSize: 26,
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(21,101,192,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
        }}
      >
        +
      </button>

      {/* ── Stock Adjustment Review Modal ── */}
      {reviewOrder && (
        <StockAdjustModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}

      {/* ── Track Order Popup ── */}
      {trackOrder && (
        <TrackPopup order={trackOrder} onClose={() => setTrackOrder(null)} />
      )}
    </>
  );
}

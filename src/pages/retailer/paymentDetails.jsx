import { useState } from "react";
import "../../css/popup.css";

// ── Mock data — replace with real API hooks ───────────────────────────────────
const mockPaymentStats = {
  total: 134000,
  paid: 52400,
  due: 25300,
  pending: 56300,
};

const mockPayments = [
  {
    id: "PAY-501",
    orderId: "ORD-45848427",
    vendor: "TEN 11 Restaurant & Bar",
    amount: 18000,
    due: "24 Feb 2026",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "PAY-502",
    orderId: "ORD-45848428",
    vendor: "GRAVITY Lounge",
    amount: 25000,
    due: "26 Feb 2026",
    method: "UPI",
    status: "Overdue",
  },
  {
    id: "PAY-503",
    orderId: "ORD-45848429",
    vendor: "Skyscape Bar & Lounge",
    amount: 9400,
    due: "28 Feb 2026",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    id: "PAY-504",
    orderId: "ORD-45848430",
    vendor: "Maurya Store",
    amount: 34500,
    due: "01 Mar 2026",
    method: "Cheque",
    status: "Pending",
  },
  {
    id: "PAY-505",
    orderId: "ORD-45848431",
    vendor: "TEN 11 Restaurant & Bar",
    amount: 12800,
    due: "15 Feb 2026",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "PAY-506",
    orderId: "ORD-45848432",
    vendor: "GRAVITY Lounge",
    amount: 21700,
    due: "10 Feb 2026",
    method: "UPI",
    status: "Refunded",
  },
];

// ── Color maps ────────────────────────────────────────────────────────────────
const statusStyle = {
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
  Refunded: {
    bg: "rgba(96,165,250,0.15)",
    text: "#60a5fa",
    border: "rgba(96,165,250,0.3)",
  },
};

// ── Generic pill badge ────────────────────────────────────────────────────────
function Badge({ label }) {
  const s = statusStyle[label] || {
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

// ── Pay Now Modal ─────────────────────────────────────────────────────────────
function PayModal({ payment, onClose, onConfirm }) {
  const [method, setMethod] = useState(payment.method);
  const [note, setNote] = useState("");
  const methods = ["Bank Transfer", "UPI", "Cheque", "Cash"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#181c27",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 18,
          padding: "24px 20px",
          width: "100%",
          maxWidth: 440,
          position: "relative",
          margin: "auto",
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
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
              flexShrink: 0,
            }}
          >
            💳
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
              Confirm Payment
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                margin: "3px 0 0",
              }}
            >
              {payment.id} · {payment.vendor}
            </p>
          </div>
        </div>

        <div
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 12,
            padding: "16px 18px",
            marginBottom: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
                margin: "0 0 4px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Amount Due
            </p>
            <p
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#fbbf24",
                margin: 0,
              }}
            >
              ₹{payment.amount.toLocaleString()}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
                margin: "0 0 4px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Order
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#f59e0b",
                margin: 0,
              }}
            >
              {payment.orderId}
            </p>
          </div>
        </div>

        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Payment Method
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {methods.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              style={{
                background:
                  method === m
                    ? "rgba(245,158,11,0.15)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${method === m ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10,
                padding: "10px 14px",
                color: method === m ? "#fbbf24" : "rgba(255,255,255,0.55)",
                fontSize: 13,
                fontWeight: method === m ? 700 : 500,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Note (Optional)
        </p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a payment note..."
          rows={2}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: "10px 12px",
            color: "#fff",
            fontSize: 13,
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={() => onConfirm({ ...payment, method, note })}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            border: "none",
            borderRadius: 10,
            padding: "14px",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 4px 14px rgba(22,163,74,0.3)",
          }}
        >
          ✅ Confirm Payment of ₹{payment.amount.toLocaleString()}
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PaymentDetails() {
  const [payModal, setPayModal] = useState(null);
  const [payments, setPayments] = useState(mockPayments);
  const [activeFilter, setActiveFilter] = useState("All");

  const stats = mockPaymentStats;
  const overduePayments = payments.filter((p) => p.status === "Overdue");
  const filters = ["All", "Paid", "Pending", "Overdue", "Refunded"];
  const filtered =
    activeFilter === "All"
      ? payments
      : payments.filter((p) => p.status === activeFilter);

  const handleConfirmPay = (payment) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === payment.id
          ? { ...p, status: "Paid", method: payment.method }
          : p,
      ),
    );
    setPayModal(null);
  };

  const pendingCount = payments.filter(
    (p) => p.status === "Pending" || p.status === "Overdue",
  ).length;

  return (
    <>
      <div className="mainpro">
        <div className="container">
          {/* ── Page Header ── */}
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
                Payments
              </h1>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  margin: 0,
                }}
              >
                Manage vendor payments
              </p>
            </div>
            {pendingCount > 0 && (
              <div
                style={{
                  background: "rgba(245,158,11,0.15)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  borderRadius: 20,
                  padding: "7px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 13 }}>🔔</span>
                <span
                  style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24" }}
                >
                  {pendingCount} Pending
                </span>
              </div>
            )}
          </div>

          {/* ── Stats bar — exact same style as OrderList ── */}
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
                label: "Total",
                value: `₹${(stats.total / 1000).toFixed(1)}K`,
                color: "#fff",
              },
              {
                label: "Paid",
                value: `₹${(stats.paid / 1000).toFixed(1)}K`,
                color: "#34d399",
              },
              {
                label: "Due",
                value: `₹${(stats.due / 1000).toFixed(1)}K`,
                color: "#f87171",
              },
              {
                label: "Pending",
                value: `₹${(stats.pending / 1000).toFixed(1)}K`,
                color: "#fbbf24",
              },
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

          {/* ── Overdue alert banner ── */}
          {overduePayments.length > 0 && (
            <div
              style={{
                background: "rgba(220,38,38,0.1)",
                border: "1px solid rgba(220,38,38,0.3)",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 14,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#f87171",
                    margin: "0 0 3px",
                  }}
                >
                  Overdue Payments Detected
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                  }}
                >
                  ₹{stats.due.toLocaleString()} overdue. Clear immediately to
                  avoid vendor disputes.
                </p>
              </div>
            </div>
          )}

          {/* ── Filter tabs ── */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background:
                    activeFilter === f
                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                      : "rgba(255,255,255,0.06)",
                  border:
                    activeFilter === f
                      ? "none"
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  padding: "7px 14px",
                  color: activeFilter === f ? "#fff" : "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  fontWeight: activeFilter === f ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ── Payments Table ── */}
          <div className="darkbox" style={{ padding: 0, overflow: "hidden" }}>
            {/* horizontal scroll wrapper */}
            <div
              style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
            >
              <div style={{ minWidth: 860 }}>
                {/* Header */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "100px 130px 1fr 90px 100px 110px 85px 95px",
                    padding: "10px 18px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    gap: 8,
                  }}
                >
                  {[
                    "PAY ID",
                    "ORDER ID",
                    "VENDOR",
                    "AMOUNT",
                    "DUE DATE",
                    "METHOD",
                    "STATUS",
                    "ACTION",
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

                {filtered.length === 0 && (
                  <div
                    style={{
                      padding: "36px 18px",
                      textAlign: "center",
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 13,
                    }}
                  >
                    No payments found for this filter.
                  </div>
                )}

                {filtered.map((payment, idx) => {
                  const isOverdue = payment.status === "Overdue";
                  const isPending = payment.status === "Pending";
                  const isPaid = payment.status === "Paid";
                  const isRefunded = payment.status === "Refunded";

                  return (
                    <div
                      key={payment.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "100px 130px 1fr 90px 100px 110px 85px 95px",
                        padding: "14px 18px",
                        gap: 8,
                        alignItems: "center",
                        borderBottom:
                          idx < filtered.length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "none",
                        background: isOverdue
                          ? "rgba(239,68,68,0.03)"
                          : "transparent",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isOverdue)
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.025)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isOverdue
                          ? "rgba(239,68,68,0.03)"
                          : "transparent";
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#f59e0b",
                        }}
                      >
                        {payment.id}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.55)",
                          fontWeight: 500,
                        }}
                      >
                        {payment.orderId}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.85)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {payment.vendor}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: isOverdue ? "#f87171" : "#fff",
                        }}
                      >
                        ₹{payment.amount.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: isOverdue
                            ? "#f87171"
                            : "rgba(255,255,255,0.45)",
                          fontWeight: isOverdue ? 700 : 400,
                        }}
                      >
                        {payment.due}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        {payment.method}
                      </span>
                      <div>
                        <Badge label={payment.status} />
                      </div>
                      <div>
                        {isPaid && (
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#34d399",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            ✓ Done
                          </span>
                        )}
                        {isRefunded && (
                          <span
                            style={{
                              fontSize: 12,
                              color: "#60a5fa",
                              fontWeight: 500,
                            }}
                          >
                            Refunded
                          </span>
                        )}
                        {(isPending || isOverdue) && (
                          <button
                            onClick={() => setPayModal(payment)}
                            style={{
                              background: isOverdue
                                ? "linear-gradient(135deg, #dc2626, #b91c1c)"
                                : "linear-gradient(135deg, #f59e0b, #d97706)",
                              border: "none",
                              borderRadius: 8,
                              padding: "7px 12px",
                              color: "#fff",
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              boxShadow: isOverdue
                                ? "0 3px 10px rgba(220,38,38,0.3)"
                                : "0 3px 10px rgba(245,158,11,0.3)",
                            }}
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {payModal && (
        <PayModal
          payment={payModal}
          onClose={() => setPayModal(null)}
          onConfirm={handleConfirmPay}
        />
      )}
    </>
  );
}

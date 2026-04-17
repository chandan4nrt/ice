import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, Search, Download, Filter, Tag, SlidersHorizontal } from "lucide-react";
import OrderCard from "../../components/OrderCard";
import { useGetStockLedgerTransactions, useGetStockLedgerStats } from "../../services/stockLedger.service";

export default function StockLedger() {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const { data: TRANSACTIONS = [], isLoading: isLoadingTxns } = useGetStockLedgerTransactions();
  const { data: stats = { totalEntries: 0, stockIn: 0, stockOut: 0 }, isLoading: isLoadingStats } = useGetStockLedgerStats();

  const stockInIcon = "/images/icons/transition-in.png";
  const stockOutIcon = "/images/icons/transition-out.png";

  const filtered = TRANSACTIONS.filter(t => {
    const matchTab = activeTab === "All" || t.type === activeTab;
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="ledgerPage">

      {/* TOP SECTION */}
      <div className="ledgerTop">

        <div className="darkbox">

          {/* SEARCH */}
          <div className="ledgerSearchBox">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product or reference..."
            />
          </div>

          {/* TABS */}
          <div className="ledgerTabs">
            {["All", "Completed", "Rejected"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`ledgerTab ${activeTab === tab ? "active" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* EXPORT */}
          <button className="ledgerExportBtn">
            <Download size={16} />
            Export
          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="ledgerStatsWrapper">
        {isLoadingStats ? (
          <p style={{ color: "white", padding: "10px 20px" }}>Loading stats...</p>
        ) : (
          <div className="ledgerStats">
            <div className="ledgerStatItem">
              <span className="text-white">Total Entries</span>
              <h2 className="limecolor">{stats.totalEntries}</h2>
            </div>

            <div className="ledgerStatItem">
              <span className="greencolor">Stock In</span>
              <h2 className="text-white">{stats.stockIn}</h2>
            </div>

            <div className="ledgerStatItem">
              <span className="lightred">Stock Out</span>
              <h2 className="text-white">{stats.stockOut}</h2>
            </div>
          </div>
        )}
      </div>

      {/* FILTER */}
      <div className="ledgerFilterWrapper">
        <button className="darkbox d-flex align-center gap-1">
          <SlidersHorizontal size={16} />
          Filter By
        </button>
      </div>

      {/* TRANSACTIONS */}
      <div className="ledgerList">

        {isLoadingTxns ? (
          <p style={{ color: "white", padding: "20px" }}>Loading transactions...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "white", padding: "20px" }}>No transactions found.</p>
        ) : (
          filtered.map((txn) => {
            const order = {
              id: txn.id,
              date: txn.date,
              items: txn.items,
              qty: txn.qty,
              status: txn.type,
              icon: txn.type === "Completed" ? stockInIcon : stockOutIcon
            };

            return <OrderCard key={txn.id} order={order} />;
          })
        )}

      </div>

    </div>
  );
}
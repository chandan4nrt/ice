import { useNavigate } from "react-router-dom";
import { Calendar, ChevronDown } from "lucide-react";
import OrderAccordion from "../../components/OrderAccordion";
import {
  useGetRetailerStats,
  useGetRetailerOrders,
} from "../../services/retailerOrder.service";
import { InfinitePagination } from "../../components/Pagination";

// ✅ Format Date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ✅ Group orders by RAW date (ISO)
const groupByDate = (orders) => {
  return orders.reduce((acc, order) => {
    const rawDate = new Date(order.createdAt).toISOString().split("T")[0];

    if (!acc[rawDate]) {
      acc[rawDate] = [];
    }

    acc[rawDate].push(order);

    return acc;
  }, {});
};

export default function RetailerOrder() {
  const navigate = useNavigate();

  const { data: stats = [], isLoading: statsLoading } = useGetRetailerStats();

  const {
    list: orders = [],
    isLoading: ordersLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetRetailerOrders();

  console.log({ orders });

  const groupedOrders = groupByDate(orders);

  return (
    <>
      {/* ✅ STATS */}
      <div className="retailerStats">
        {statsLoading
          ? "Loading..."
          : stats.map((s) => (
              <div key={s.label} className="retailerStatCard">
                <div className="retailerStatLabel">{s.label}</div>
                <div className="retailerStatValue">{s.value}</div>
              </div>
            ))}
      </div>

      {/* ✅ ORDERS LIST */}
      {ordersLoading ? (
        "Loading orders..."
      ) : (
        <>
          {Object.entries(groupedOrders)
            .sort((a, b) => new Date(b[0]) - new Date(a[0])) // ✅ correct sort
            .map(([rawDate, orders]) => (
              <div key={rawDate}>
                {/* ✅ DATE HEADER */}
                <div className="retailerDate">
                  <Calendar size={16} />
                  <span>{formatDate(rawDate)}</span>
                  <ChevronDown size={18} />
                </div>

                {/* ✅ SAME UI */}
                <OrderAccordion orders={orders} />
              </div>
            ))}

          <InfinitePagination
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
    </>
  );
}
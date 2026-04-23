import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import OrderAccordion from '../../components/OrderAccordion';
import { useGetRetailerStats, useGetRetailerOrders } from '../../services/retailerOrder.service';
import { InfinitePagination } from '../../components/Pagination';

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

const RetailerOrders = () => {
    const { data: stats = [], isLoading: statsLoading } = useGetRetailerStats();

    const {
        list: orders = [],
        isLoading: ordersLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetRetailerOrders();

    const groupedOrders = groupByDate(orders);

    const statColors = [
        '#131c2b', // Total Orders
        '#d5aa4d', // In Orders (Yellow)
        '#ccd569', // Unpaid (Lime)
        '#89d389', // Completed (Green)
    ];

    return (
        <div className="retailerBody" style={{ padding: '0px' }}>
            {/* Stats Cards */}
            <div className="retailerStats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '25px' }}>
                {statsLoading
                    ? "Loading..."
                    : stats.map((stat, index) => (
                        <div 
                            key={index} 
                            className="retailerStatCard" 
                            style={{ 
                                background: statColors[index % statColors.length], 
                                color: index === 0 ? '#fff' : '#000',
                                padding: '12px 5px',
                                borderRadius: '10px',
                                textAlign: 'center'
                            }}
                        >
                            <div className="retailerStatLabel" style={{ fontSize: '10px', opacity: 0.8, marginBottom: '5px', color: index === 0 ? '#fff' : '#000' }}>{stat.label}</div>
                            <div className="retailerStatValue" style={{ fontSize: '20px', fontWeight: '700' }}>{stat.value}</div>
                        </div>
                    ))}
            </div>

            {/* Orders List */}
            {ordersLoading ? (
                <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>Loading orders...</div>
            ) : (
                <>
                    {Object.entries(groupedOrders)
                        .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                        .map(([rawDate, orders]) => (
                            <div key={rawDate}>
                                {/* DATE HEADER */}
                                <div className="retailerDate" style={{ margin: '20px 0', border: 'none' }}>
                                    <Calendar size={18} />
                                    <span style={{ fontSize: '15px' }}>{formatDate(rawDate)}</span>
                                    <ChevronDown size={18} />
                                </div>

                                <OrderAccordion orders={orders} />
                            </div>
                        ))}

                    <div style={{ marginTop: '20px' }}>
                        <InfinitePagination
                            hasNextPage={hasNextPage}
                            fetchNextPage={fetchNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default RetailerOrders;

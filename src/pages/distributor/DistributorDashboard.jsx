import React from 'react';
import { 
  Users, 
  Store, 
  Package, 
  TrendingUp, 
  ShoppingCart, 
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import '../../css/distributor-dashboard.css';

const StatCard = ({ title, value, icon: Icon, change, isPositive, colorClass }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div className={`icon-box ${colorClass}`}>
        <Icon className="text-white" size={24} />
      </div>
      <div className={`trend-indicator ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}%
      </div>
    </div>
    <h3 className="stat-label">{title}</h3>
    <p className="stat-value">{value}</p>
  </div>
);

const DistributorDashboard = () => {
  // Mock Data
  const stats = [
    { title: 'Total Sales', value: '₹ 4,25,000', icon: TrendingUp, change: 12.5, isPositive: true, colorClass: 'blue' },
    { title: 'Active Stockists', value: '24', icon: Store, change: 8.2, isPositive: true, colorClass: 'purple' },
    { title: 'Sales Team', value: '18', icon: Users, change: 2.4, isPositive: false, colorClass: 'orange' },
    { title: 'Available Products', value: '142', icon: Package, change: 5.1, isPositive: true, colorClass: 'green' },
  ];

  const recentOrders = [
    { id: '#ORD-7231', customer: 'Fresh Bakes Ranchi', date: '2 mins ago', amount: '₹ 12,400', status: 'Delivered' },
    { id: '#ORD-7230', customer: 'City Mart', date: '15 mins ago', amount: '₹ 8,100', status: 'Pending' },
    { id: '#ORD-7229', customer: 'Hotel Raj', date: '45 mins ago', amount: '₹ 22,000', status: 'Processing' },
    { id: '#ORD-7228', customer: 'Reliance Smart', date: '2 hours ago', amount: '₹ 45,000', status: 'Delivered' },
  ];

  const alerts = [
    { title: 'Low Stock Alert', msg: 'Alkaline Ice 500g is below 20 units', time: '1 hour ago', type: 'warning' },
    { title: 'Payment Due', msg: 'Vishal Enterprises - ₹ 15,000 pending since 7 days', time: '3 hours ago', type: 'error' },
  ];

  return (
    <div className="dash-container">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Distributor Dashboard</h1>
          <p className="dash-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="btn-primary">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="main-content-grid">
        {/* Recent Orders Table */}
        <div className="card-container">
          <div className="card-header">
            <h2 className="card-title">Recent Orders</h2>
            <button className="btn-link">View All</button>
          </div>
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600, color: '#ffffff' }}>{order.id}</td>
                    <td>{order.customer}</td>
                    <td style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{order.date}</td>
                    <td style={{ fontWeight: 700, color: '#ffffff' }}>{order.amount}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="card-container">
          <div className="card-header">
            <h2 className="card-title">System Alerts</h2>
          </div>
          <div className="alert-list">
            {alerts.map((alert, idx) => (
              <div key={idx} className="alert-item">
                <div className={`alert-icon-box ${alert.type}`}>
                  <AlertCircle size={20} />
                </div>
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.msg}</p>
                  <span className="alert-time">
                    <Clock size={10} /> {alert.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-dashed">
            + Customize Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;

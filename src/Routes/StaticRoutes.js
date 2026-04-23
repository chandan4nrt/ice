/**
 * Static Route Configuration as a fallback for Backend API
 * Matches the structure returned by flattenMenu()
 */
export const STATIC_ROUTES = {
  ADMIN: [
    { id: 101, path: "/admin/dashboard", component: "AdminDashboard", label: "Dashboard" },
    { id: 102, path: "/admin/add-vendor", component: "AddVendor", label: "Add Vendor" },
    { id: 103, path: "/admin/users", component: "Users", label: "Users" },
    { id: 104, path: "/admin/settings", component: "Settings", label: "Settings" },
    { id: 105, path: "/admin/business-details", component: "BusinessDetails", label: "Business Details" },
    { id: 106, path: "/admin/kyc-verification", component: "KYCVerification", label: "KYC Verification" },
    { id: 107, path: "/admin/bank-details", component: "BankDetails", label: "Bank Details" },
    { id: 108, path: "/admin/location-verification", component: "LocationVerification", label: "Location Verification" },
    { id: 109, path: "/admin/review-submit", component: "ReviewSubmit", label: "Review Submit" },
  ],
  VENDOR: [
    { id: 201, path: "/vendor/dashboard", component: "VendorDashboard", label: "Dashboard" },
    { id: 202, path: "/vendor/create-retailer-order", component: "CreateRetailerOrder", label: "Retailer Order" },
    { id: 203, path: "/vendor/create-replenishment-order", component: "CreateReplenishmentOrder", label: "Replenishment Order" },
    { id: 204, path: "/vendor/stock-ledger", component: "StockLedger", label: "Stock Ledger" },
    { id: 205, path: "/vendor/incoming-stocks", component: "IncomingStocks", label: "Incoming Stocks" },
    { id: 206, path: "/vendor/home", component: "Home", label: "Home" },
    { id: 207, path: "/vendor/company", component: "Company", label: "Company" },
    { id: 208, path: "/vendor/why-iceberg", component: "WhyIceberg", label: "Why Iceberg" },
    { id: 209, path: "/vendor/products", component: "Products", label: "Products" },
    { id: 210, path: "/vendor/where", component: "Where", label: "Where" },
  ],
  DISTRIBUTOR: [
    { id: 301, path: "/distributor/dashboard", component: "VendorDashboard", label: "Dashboard" },
    { id: 302, path: "/distributor/retailer-orders", component: "RetailerOrders", label: "Retailer Orders" },
    { id: 303, path: "/distributor/create-retailer-order", component: "CreateRetailerOrder", label: "Create Retailer Order" },
    { id: 304, path: "/distributor/create-replenishment-order", component: "CreateReplenishmentOrder", label: "Replacement Order" },
    { id: 305, path: "/distributor/stock-ledger", component: "StockLedger", label: "Stock Ledger" },
    { id: 306, path: "/distributor/incoming-stocks", component: "IncomingStocks", label: "Incoming Stocks" },
    // { id: 301, path: "/distributor/dashboard", component: "DistributorDashboard", label: "Dashboard" },
    // { id: 302, path: "/distributor/users", component: "DistributorUsers", label: "System Users" },
    // { id: 303, path: "/distributor/stockist-management", component: "StockistManagement", label: "Stockist Management" },
    // { id: 304, path: "/distributor/sales-person-management", component: "SalesPersonManagement", label: "Sales Person Management" },
    // { id: 305, path: "/distributor/product-management", component: "ProductManagement", label: "Product Management" },
    { id: 307, path: "/distributor/order-confirmation", component: "DistributorOrderConfirmation", label: "Order Confirmation" },
    { id: 308, path: "/distributor/invoice/INV-001", component: "DistributorInvoicePage", label: "Invoice" },

  ],
  SALESMAN: [
    { id: 401, path: "/sales/dashboard", component: "SalesDashboard", label: "Dashboard" },
    { id: 402, path: "/sales/orders", component: "Orders", label: "Orders" },
  ]
};

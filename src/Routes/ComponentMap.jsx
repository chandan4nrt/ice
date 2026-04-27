import { lazy } from 'react'

/** Vendor Route */
const RetailerOrder = lazy(() => import('../pages/vendor/RetailerOrder'))
const CreateRetailerOrder = lazy(() => import('../pages/vendor/CreateRetailerOrder'))
const CreateReplenishmentOrder = lazy(() => import('../pages/vendor/CreateReplenishmentOrder'))
const StockLedger = lazy(() => import('../pages/vendor/StockLedger'))
const IncomingStocks = lazy(() => import('../pages/vendor/IncomingStocks'))
const VendorDashboard = lazy(() => import('../pages/vendor/VendorDashboard'))
const Home = lazy(() => import('../pages/vendor/Home'))
const Company = lazy(() => import('../pages/vendor/Company'))
const WhyIceberg = lazy(() => import('../pages/vendor/WhyIceberg'))
const Products = lazy(() => import('../pages/vendor/Products'))
const Where = lazy(() => import('../pages/vendor/Where'))
const DistributorUsers = lazy(() => import('../pages/distributor/DistributorUsers'))
const UpdateVendorHero = lazy(() => import('../components/addVendor/UpdateVendorHero'))
const DistributorDashboard = lazy(() => import('../pages/distributor/DistributorDashboard'))
const VendorDetails = lazy(() => import('../pages/distributor/VendorDetails'))
const StockistManagement = lazy(() => import('../pages/distributor/StockistManagement'))
const SalesPersonManagement = lazy(() => import('../pages/distributor/SalesPersonManagement'))
const ProductManagement = lazy(() => import('../pages/distributor/ProductManagement'))
const DistributorOrderConfirmation = lazy(() => import('../pages/distributor/OrderConfirmation'))
const DistributorInvoicePage = lazy(() => import('../pages/distributor/InvoicePage'))
// const DistributorRetailerOrders = lazy(() => import('../pages/distributor/RetailerOrders'))



/** Admin Imports */
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'))
const AddVendor = lazy(() => import('../pages/admin/AddVendor'))
const ResigterVendorHero = lazy(() => import('../components/addVendor/ResigterVendorHero'))
const BusinessDetails = lazy(() => import('../pages/admin/BusinessDetails'))
const KYCVerification = lazy(() => import('../pages/admin/KYCVerification'))
const BankDetails = lazy(() => import('../pages/admin/BankDetails'))
const LocationVerification = lazy(() => import('../pages/admin/LocationVerification'))
const ReviewSubmit = lazy(() => import('../pages/admin/ReviewSubmit'))
const Users = lazy(() => import('../pages/admin/Users'))
const Settings = lazy(() => import('../pages/admin/Settings'))
const ProductsDetails = lazy(() => import('../pages/admin/ProductsDetails'))

/** Retailer Imports */
const CreateOrder = lazy(() => import("../pages/retailer/createOrder"));
const RetailerDashboard = lazy(
  () => import("../pages/retailer/retailerDashboard"),
);
const OrderList = lazy(() => import("../pages/retailer/orderList"));
const PaymentDetail = lazy(() => import("../pages/retailer/paymentDetails"));

/** Sales Imports */
const SalesDashboard = lazy(() => import('../pages/sales/SalesDashboard'))


const WithVendorFormProvider = (Component) => {
  return (props) => (
    <ResigterVendorHero standaloneMode={true}>
      <Component {...props} />
    </ResigterVendorHero>
  );
};

export const componentMap = {
  /** Vendor Components */
  VendorDashboard,
  StockLedger,
  IncomingStocks,
  CreateReplenishmentOrder,
  CreateRetailerOrder,
  RetailerOrder,
  // Orders: RetailerOrder,
  Home,
  Company,
  WhyIceberg,
  Products,
  Where,

  /** Distributor Components */
  DistributorDashboard,
  Dashboard: DistributorDashboard,
  DistributorUsers,
  EditVendor: UpdateVendorHero,
  VendorDetails,
  StockistManagement,
  SalesPersonManagement,
  ProductManagement,
  DistributorOrderConfirmation: DistributorOrderConfirmation,
  DistributorInvoicePage: DistributorInvoicePage,
  // RetailerOrders: DistributorRetailerOrders,
  RetailerOrders: RetailerOrder,

  /** Admin Components */
  AdminDashboard,
  AddVendor: ResigterVendorHero,
  BusinessDetails: WithVendorFormProvider(BusinessDetails),
  KYCVerification: WithVendorFormProvider(KYCVerification),
  BankDetails: WithVendorFormProvider(BankDetails),
  LocationVerification: WithVendorFormProvider(LocationVerification),
  ReviewSubmit: WithVendorFormProvider(ReviewSubmit),
  Users,
  Settings,
  ProductDetails: ProductsDetails,

  /** Retailer Component */
  CreateOrder,
  RetailerDashboard,
  OrderList,
  PaymentDetail,

  /** Sales Components */
  SalesDashboard,
};
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
  "VendorDashboard": VendorDashboard,
  StockLedger,
  "StockLedger": StockLedger,
  IncomingStocks,
  "IncomingStocks": IncomingStocks,
  CreateReplenishmentOrder,
  "CreateReplenishmentOrder": CreateReplenishmentOrder,
  CreateRetailerOrder,
  "CreateRetailerOrder": CreateRetailerOrder,
  RetailerOrder,
  "RetailerOrder": RetailerOrder,
  "Orders": RetailerOrder,
  Home,
  "Home": Home,
  Company,
  "Company": Company,
  WhyIceberg,
  "WhyIceberg": WhyIceberg,
  Products,
  "Products": Products,
  Where,
  "Where": Where,

  /** Distributor Components */
  DistributorDashboard,
  "DistributorDashboard": DistributorDashboard,
  "Dashboard": DistributorDashboard,
  DistributorUsers,
  "DistributorUsers": DistributorUsers,
  "EditVendor": UpdateVendorHero,
  VendorDetails,
  "VendorDetails": VendorDetails,
  StockistManagement,
  "StockistManagement": StockistManagement,
  SalesPersonManagement,
  "SalesPersonManagement": SalesPersonManagement,
  ProductManagement,
  "ProductManagement": ProductManagement,
  "DistributorOrderConfirmation": DistributorOrderConfirmation,
  "DistributorInvoicePage": DistributorInvoicePage,

  /** Admin Components */
  Dashboard: AdminDashboard,
  "AdminDashboard": AdminDashboard,
  AddVendor: ResigterVendorHero,
  "AddVendor": ResigterVendorHero,
  BusinessDetails: WithVendorFormProvider(BusinessDetails),
  "BusinessDetails": WithVendorFormProvider(BusinessDetails),
  KYCVerification: WithVendorFormProvider(KYCVerification),
  "KYCVerification": WithVendorFormProvider(KYCVerification),
  BankDetails: WithVendorFormProvider(BankDetails),
  "BankDetails": WithVendorFormProvider(BankDetails),
  LocationVerification: WithVendorFormProvider(LocationVerification),
  "LocationVerification": WithVendorFormProvider(LocationVerification),
  ReviewSubmit: WithVendorFormProvider(ReviewSubmit),
  "ReviewSubmit": WithVendorFormProvider(ReviewSubmit),
  Users,
  "Users": Users,
  Settings,
  "Settings": Settings,
  ProductDetails: ProductsDetails,
  "ProductDetails": ProductsDetails,

  /** Sales Components */
  SalesDashboard,
  "SalesDashboard": SalesDashboard,
};
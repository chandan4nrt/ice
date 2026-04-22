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
const OrderConfirmation = lazy(() => import('../pages/vendor/OrderConfirmation'))
const InvoicePage = lazy(() => import('../pages/vendor/InvoicePage'))
/** Distributor Imports */
const DistributorUsers = lazy(() => import('../pages/distributor/DistributorUsers'))
const UpdateVendorHero = lazy(() => import('../components/addVendor/UpdateVendorHero'))
const VendorDetails = lazy(() => import('../pages/distributor/VendorDetails'))


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


export const componentMap = {
  /** Vendor Component */
  VendorDashboard,
  StockLedger,
  IncomingStocks,
  CreateReplenishmentOrder,
  CreateRetailerOrder,
  RetailerOrder,
  Home,
  Company,
  WhyIceberg,
  Products,
  Where,
  OrderConfirmation,
  InvoicePage,

  /** Distributor Component */
  DistributorUsers,
  EditVendor: UpdateVendorHero,
  VendorDetails,

  /** Admin Component */
  //api-menuName":"Dashboard" - react component - AdminDashboard

  Dashboard: AdminDashboard,
  AddVendor: ResigterVendorHero,
  BusinessDetails: BusinessDetails,
  KYCVerification,
  BankDetails,
  LocationVerification,
  ReviewSubmit,
  Users,
  Settings,
  ProductDetails: ProductsDetails,
  /** Sales Component */
  SalesDashboard,
};
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import PublicRoute from "./PublicRoute";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import Unauthorized from "../pages/Unauthorized";
import { componentMap } from "./ComponentMap";
import { getRoleBasedRedirect } from "../utills/helper";
import NotFound from "../pages/NoteFound";

import { STATIC_ROUTES } from "./StaticRoutes";

const renderDynamicRoutes = (routes) => {
  if (!routes) return []

  return routes.map((route) => {
    const Component = componentMap[route.component];

    if (!Component) {
      console.warn(`Route component "${route.component}" not found in ComponentMap for path "${route.path}"`);
      return null;
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={<Component />}
      />
    );
  }).filter(Boolean);
};

const AppRoutes = ({ logoUrl }) => {
  const { user, loading: authLoading } = useAuth();
  const role = user?.primaryRole?.toUpperCase();
  
  // Exclusively using static routes
  const finalRoutes = (role && STATIC_ROUTES[role]) ? STATIC_ROUTES[role] : [];

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Layout */}
      <Route element={<Layout logoUrl={logoUrl} />}>
        <Route element={<ProtectedRoute allowedRoles={user?.roleCodes} />}>
          {/* Static Process Routes */}
          <Route path="/sales/invoice/:id" element={role === 'DISTRIBUTOR' ? <componentMap.DistributorInvoicePage /> : <componentMap.InvoicePage />} />
          <Route path="/sales/order-confirmation" element={role === 'DISTRIBUTOR' ? <componentMap.DistributorOrderConfirmation /> : <componentMap.OrderConfirmation />} />

          {/* Dynamic Routes */}
          {renderDynamicRoutes(finalRoutes)}
        </Route>
      </Route>

      <Route index element={<Navigate to={getRoleBasedRedirect(user?.primaryRole)} replace />} />
      <Route path="*" element={<ProtectedRoute allowedRoles={user?.roleCodes}><NotFound /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import PublicRoute from "./PublicRoute";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import Unauthorized from "../pages/Unauthorized";
import { componentMap } from "./ComponentMap";
import { useGetRoutes, useGetSidebar } from "../services/auth.service";
import { getRoleBasedRedirect, flattenMenu } from "../utills/helper";
import NotFound from "../pages/NoteFound";

const renderDynamicRoutes = (routes) => {
  if (!routes) return []

  return routes.map((route) => {
    const Component = componentMap[route.component];

    if (!Component) return null;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={<Component />}
      />
    );
  });
};

const AppRoutes = ({ logoUrl }) => {
  const { user, loading } = useAuth();
  const { data: dynamicRoutes } = useGetRoutes(user?.primaryRole);
  const { data: menuItems } = useGetSidebar();

  const finalRoutes = (dynamicRoutes && dynamicRoutes.length > 0)
    ? dynamicRoutes
    : (menuItems ? flattenMenu(menuItems) : []);

  if (loading) {
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
          <Route path="/sales/order-confirmation" element={<componentMap.OrderConfirmation />} />
          <Route path="/sales/invoice/:id" element={<componentMap.InvoicePage />} />

          {/* Dynamic Routes */}
          {renderDynamicRoutes(finalRoutes)}
        </Route>
      </Route>

      <Route index element={<Navigate to={getRoleBasedRedirect(user?.primaryRole)} replace />} />
      {dynamicRoutes && <Route path="*" element={<ProtectedRoute allowedRoles={user?.roleCodes}><NotFound /></ProtectedRoute>} />}
    </Routes>
  );
};

export default AppRoutes;
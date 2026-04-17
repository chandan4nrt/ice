export const getRoleBasedRedirect = (role) => {
  if (!role) return "/login"
  const redirects = {
    ADMIN: "/admin/dashboard",
    VENDOR: "/vendor/dashboard",
    DISTRIBUTOR: "/distributor/dashboard",
    USER: "/user/dashboard",
    SALESMAN: "/sales/dashboard",
  };
  return redirects[role] ;
};

const slugify = (text) =>
  text?.toLowerCase().replace(/\s+/g, "-");

export const transformMenu = (menus) => {
  if(!menus) return []

  return menus?.map((item) => {
    const name = item.pageName || item.menuName;

    return {
      id: item.id,
      label: item.menuName,
      path: item.pageName ? item.pageName : `/admin/${slugify(name)}`,
      status: item.status,

      // recursive for children
      children: item.subMenus?.length
        ? transformMenu(item.subMenus)
        : [],
    };
  });
};

export const isAccessingFromMobileWithToken = () => {
  const isMobile = localStorage.getItem("isAndroid")
  const token = localStorage.getItem("token")

  return isMobile && !!token
}

export const flattenMenu = (menu) => {
  let routes = [];
  menu.forEach((item) => {
    if (item.children && item.children.length > 0) {
      routes = [...routes, ...flattenMenu(item.children)];
    } else {
      // Create a route object for leaf nodes
      routes.push({
        path: item.path,
        // Derive component name from label (e.g. "Sales Dashboard" -> "SalesDashboard")
        component: item.label.replace(/\s+/g, ""),
      });
    }
  });
  return routes;
};
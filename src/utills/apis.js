/**
 * __ => /
 * _ => - & camal case (e.g. classId => class-id)
 * Used to define API endpoints in a structured manner
 * Example: SHARE__ALL_SCHOOLE_ID_WITH_NAME translates to /api/v1/share/all-school-id-with-name
 */

export const APIs = {
  AUTH__LOGIN: "/api/v1/auth/login",
  GET_USER_DETAILS: "get-user-details-from-localstorage",
  GET_SIDEBAR_MENU: "your-sidebar-menu-endpoint",
  GET_ROUTES: "your-route-endpoint",
  MENUMASTER: "/api/v1/menumaster", // {roleCode}
  MENUMASTER__SUBMENU: "/api/v1/menumaster/submenu", // {roleCode}
  VENDOR: "/api/v1/vendor",
  VENDOR__DOCUMENTS: "/api/v1/vendor/documents/", //{documentId}

  //Retailer order 
  RETAILER_STATS: "/retailer/orders/stats",
  RETAILER_ORDERS: "/retailer/orders/list",







  GET_RETAILERS: "/api/v1/retailer",//Get All Retailer Details{Dropdown}
  PRODUCT_DETAILS: "/api/v1/productdetails",//{Dropdown}
  CREATE_ORDER: "/api/v1/order",//Create retailer order{form}
};

export const banner_APIs = {
  SAVE_BANNERS: "/api/v1/banners/",
  GET_ALL_BANNERS: "/api/v1/banners/",
  GET_BANNERS_BY_ID: "/api/v1/banners/id",
  DELETE_BANNER: "/api/v1/banners/id"
};
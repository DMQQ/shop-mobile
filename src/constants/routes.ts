//export const API = "http://192.168.0.25:3000";

import { RootStackParams } from "/@types/types";

//export const API = "http://srv25.mikr.us:40033";

function getApiRouteENV() {
  const url = process.env.API || process.env.BACKEND_URL;

  if (!url) throw new Error("API URL not found");

  return url;
}

export const API = getApiRouteENV();

export const ENDPOINTS = {
  //
  cartAdd: `${API}/cart`,
  cart: `${API}/cart`,
  cartDelete: `${API}/cart/`, // + prod_id,
  //
  history: `${API}/payments/history`,
  purchase: `${API}/payments/purchase`,
  //
  notificationsAddToken: `${API}/notifications/upload-token`,
  notificationsSettings: `${API}/notifications/settings`,
  //
  productsAll: `${API}/products`,
  searchProducts: `${API}/products/searched=`,
  searchHistory: `${API}/products/search-history`,
  searchedProducts: `${API}/products/searched-products`, // this
  searchCategory: `${API}/products/category=`,
  searchById: `${API}/products/product/`,
  goodRatedProducts: `${API}/products/good-rated`, // this
  //
  login: `${API}/auth/login`,
  register: `${API}/auth/register`,
  //

  dailySale: `${API}/sales/daily`,
};

export const screens = {
  HOME: "Home",
  LOGIN: "Login",
  REGISTER: "Register",
  AUCTIONS: "Auctions",
  AUCTION: "Auction",
  CART: "Cart",
  USER: "User",
  SEARCH: "Search",
  WATCHLIST: "Watchlist",
  PRODUCT: "Product",
};

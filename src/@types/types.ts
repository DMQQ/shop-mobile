import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import SCREENS from "constants/routes";

export type UserContextProviderType = {
  children: React.ReactNode;
  onSplashScreen?: () => void;
};

export interface ProductImageProps {
  id: number;
  name: string;
}

export interface CartProps extends ProductMinified {
  cart_id: number;
  ammount: number;
}

export interface ProductRatingProps {
  rating_id: number;
  user_id: number;
  rating: number;
  title: string;
  description: string;
}

export interface ProductMinified {
  prod_id: number;
  price: number;
  title: string;
  images: ProductImageProps[];
}

export interface Product {
  rating: number;
  prod_id: number;
  price: number;
  discount_price?: number | null | undefined;
  title: string;
  expiration_date?: string;
  description?: string;
  category?: string;
  images: ProductImageProps[];
  ratings?: ProductRatingProps[];
  manufacturer?: string;
  vendor?: {
    id?: number;
    email?: string;
    name?: string;
    surname?: string;
  };
  quantity?: number;
}

export type UserType = {
  token: string;
  name: string;
  user_id: number;
  isLoggedIn: boolean;
  isLoading: boolean;
  role: string;
};

export type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  SaveUser: (props: any) => void;
  ReadUser: () => Promise<undefined | UserType>;
  RemoveUser: () => void;
  updateToken: (s: string) => void;
  getToken: () => Promise<string>;
};

type Filters =
  | "category"
  | "price"
  | "manufacturer"
  | "vendor"
  | "rating"
  | "sort"
  | "search";

export type NestedSearchScreens = {
  Filters?: {
    focusedFilter: Filters;
  };
  Searched?: undefined;
  Query?: undefined;
};

export type RootStackParams = {
  [SCREENS.INITIAL_ROUTE_NAME]: Object | undefined;
  [SCREENS.SEARCH]?: NestedSearchScreens;
  [SCREENS.HOME]: undefined;
  [SCREENS.AUCTION]: { auction_id: string; title?: string };
  [SCREENS.AUCTIONS]: undefined;
  [SCREENS.PURCHASE_HISTORY]: undefined;
  [SCREENS.CART]: Partial<{
    selectedProductId: number;
    scrollToProductOnOpen: boolean;
    sharedID: string;
    prod_id: number;
  }>;
  [SCREENS.USER]: undefined;
  [SCREENS.AUTH]?: undefined;
  [SCREENS.LANDING]: undefined;
  [SCREENS.DASHBOARD]: undefined;
  [SCREENS.REGISTER]?: undefined;
  [SCREENS.LOGIN]?: {
    email?: string;
    password?: string;
  };
  [SCREENS.WATCHLIST]?: undefined;
  [SCREENS.UPLOAD]: undefined;
  [SCREENS.MY_REVIEWS]: undefined;
  [SCREENS.ACCOUNT_SETTINGS]: undefined;
  [SCREENS.SEARCH_RESULTS]: { category: string; options?: Object };
  [SCREENS.PRODUCT]: {
    prod_id: number;
    sharedID: string;
    image: string;
    title: string;
    isSharedAnimationUsed?: boolean;
    previousScreen?: string;
  };
  [SCREENS.CREATE_REVIEW]: {
    prod_id: number;
    thumbnail: string;
    sharedID: string;
    prod_name: string;
  };
  [SCREENS.PRODUCT_REVIEWS]: {
    reviews: any[];
    prod_name: string;
    prod_id: number;
    sharedID: string;
  };
  [SCREENS.CHECKOUT]: { cart: any[]; total: number };
  [SCREENS.CHECKOUT_DETAILS]: undefined;
  [SCREENS.CHECKOUT_PAYMENT]: undefined;
  [SCREENS.IMAGE_PREVIEW]: { images: ProductImageProps[] };
  [SCREENS.PRODUCTS]: { path?: string };
};

export type useNavigationProps = StackNavigationProp<RootStackParams>;

interface ConfigurableScreenProps<
  T extends ParamListBase,
  List extends keyof T
> {
  route: RouteProp<T, List>;
  navigation: StackNavigationProp<T>;
}

export type SearchNestedScreenProps<T extends keyof NestedSearchScreens> =
  ConfigurableScreenProps<NestedSearchScreens, T>;

export type ScreenNavigationProps<T extends keyof RootStackParams> =
  ConfigurableScreenProps<RootStackParams, T>;

export interface SuggestionType {
  image: string;
  prod_id: number;
  title: string;
  price: number;
}

export interface HistoryResponse {
  hasMore: boolean;
  results: {
    product: Product;
    details: {
      purchase_id: number;
      date: string;
      status: string;
    };
  }[];
}

export interface AuctionBid {
  readonly date_add: Date;
  readonly bid_id: string;
  readonly amount: number;
  user?: number;
}

export interface Auction {
  readonly auction_id?: string;
  product?: Product;

  bids: AuctionBid[];
}

export interface Paging<T> {
  hasMore: boolean;
  results: T[];
}

export interface DetailsProps extends Omit<ProductMinified, "images"> {
  image: string;
  sharedID: string;
  ratings: ProductRatingProps[];
  description: string;
  quantity: number;
  category: string;
  rating: number;
}

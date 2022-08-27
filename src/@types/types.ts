import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, RouteProp } from "@react-navigation/native";

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
  img_id: ProductImageProps[];
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
  img_id: ProductImageProps[];
  rating_id?: ProductRatingProps[];
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
};

export type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  SaveUser: (props: any) => void;
  ReadUser: () => Promise<undefined | UserType>;
  RemoveUser: () => void;
  updateToken: (s: string) => void;
};

export type NestedSearchScreens = {
  Filters: undefined;
  Searched: undefined;
  Query: undefined;
};

export type RootStackParams = {
  initialRouteName: Object | undefined;
  Search: NestedSearchScreens;
  Home: undefined;
  Auction: { auction_id: string; title?: string };
  Auctions: undefined;
  PurchaseHistory: undefined;
  Cart: undefined;
  User: undefined;
  Auth?: undefined;
  Landing: undefined;
  Dashboard: undefined;
  Register?: undefined;
  Login?: undefined;
  Watchlist?: undefined;
  Upload: undefined;
  MyReviews: undefined;
  AccountSettings: undefined;
  SearchResults: { category: string; options?: Object };
  Details: {
    prod_id: number;
    sharedID: string;
    image: string;
    title: string;
  };
  CreateReview: {
    prod_id: number;
    thumbnail: string;
    sharedID: string;
    prod_name: string;
  };
  ProductReviews: {
    reviews: any[];
    prod_name: string;
    prod_id: number;
    sharedID: string;
  };
  ///
  Checkout: { cart: any[]; total: number };

  Checkout_details: undefined;
  Checkout_payment: undefined;
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

export interface DetailsProps extends Omit<ProductMinified, "img_id"> {
  image: string;
  sharedID: string;
  rating_id: ProductRatingProps[];
  description: string;
  quantity: number;
  category: string;
  rating: number;
}

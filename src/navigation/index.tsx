import {
  DarkTheme,
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import type { RootStackParams } from "/@types/types";
import useCheckToken from "utils/hooks/useCheckToken";
import * as Screen from "./Screens";
import * as Option from "./options";
import { StatusBar } from "expo-status-bar";
import useColorTheme from "@utils/context/ThemeContext";
import useNotifications from "utils/notifications/MainNotifications";
import axios from "axios";

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParams>>();

export const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function MainNavigator() {
  const { theme, current } = useColorTheme();
  const checkToken = useCheckToken();

  return (
    <>
      <StatusBar backgroundColor={theme.primary} />
      <NavigationContainer
        ref={navigationRef}
        theme={current === "dark" ? DarkTheme : undefined}
      >
        <Navigator {...checkToken} />
      </NavigationContainer>
    </>
  );
}

const Navigator = ({
  token,
  isLoggedIn,
  name,
}: {
  token: string;
  isLoggedIn: boolean;
  name: string;
}) => {
  const { theme } = useColorTheme();
  const { isNotificationsTokenUploaded } = useNotifications();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    isNotificationsTokenUploaded(token, cancelToken);

    return () => cancelToken.cancel();
  }, [token]);

  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      initialRouteName={isLoggedIn ? "Home" : "Landing"}
      screenOptions={{
        ...Option.defaultStackOptions,
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.text,
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={Screen.Home}
            options={Option.homeScreenOptions}
          />
          <Stack.Screen name="Auctions" component={Screen.Auctions} />
          <Stack.Screen name="Upload" component={Screen.Upload} />
          <Stack.Screen
            name="Auction"
            component={Screen.Auction}
            options={Option.auctionOptions}
          />
          <Stack.Screen
            name="Cart"
            component={Screen.Cart}
            initialParams={{ sharedID: "Cart" }}
            options={Option.cartScreenOptions}
            sharedElements={({ params }) => {
              return !!params.selectedProductId
                ? ["prod_id." + params.selectedProductId + params.sharedID]
                : [];
            }}
          />

          <Stack.Screen
            component={Screen.User}
            name="User"
            options={() => Option.userScreenOptions(name)}
          />

          <Stack.Screen
            component={Screen.Watchlist}
            options={Option.watchlistScreenOptions}
            name="Watchlist"
          />
          <Stack.Screen
            component={Screen.ProductDetails}
            name="Product"
            options={Option.detailsScreenOptions}
            sharedElements={({ params }, opt) => {
              const { prod_id, sharedID, isSharedAnimationUsed } = params;
              //prettier-ignore
              const valid = ["Home","Search","SearchResults","PurchaseHistory","Details",'Watchlist',"Cart"];

              if (
                sharedID &&
                valid.includes(opt.name) &&
                isSharedAnimationUsed
              ) {
                return ["prod_id." + prod_id + sharedID];
              }
            }}
          />

          <Stack.Screen
            name="Checkout"
            component={Screen.Checkout}
            options={Option.checkOutScreenOptions}
          />
          <Stack.Screen
            name="SearchResults"
            component={Screen.SearchResults}
            options={({ route }) => ({
              title: `Looking for: ${route.params.category}`,
            })}
          />
          <Stack.Screen
            name="CreateReview"
            component={Screen.CreateReview}
            sharedElements={(route) => {
              const { prod_id, sharedID } = route.params;
              return ["prod_id." + prod_id + sharedID];
            }}
            options={Option.createReviewOptions}
          />
          <Stack.Screen
            name="ProductReviews"
            component={Screen.ProductReviews}
            options={Option.productReviewsOption}
          />
          <Stack.Screen
            name="MyReviews"
            component={Screen.MyReviews}
            options={Option.myReviewsOption}
          />
          <Stack.Screen
            name="AccountSettings"
            component={Screen.AccountSettings}
            options={Option.accountSettingsOption}
          />
          <Stack.Screen
            name="Search"
            component={Screen.SearchScreen}
            options={Option.searchOptions}
          />
          <Stack.Screen
            name="PurchaseHistory"
            component={Screen.PurchaseHistory}
            options={Option.purchaseHistoryOption}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Landing"
            component={Screen.Landing}
            options={Option.landingOptions}
          />

          <Stack.Screen
            name="Register"
            component={Screen.Register}
            options={Option.authOptions}
          />
          <Stack.Screen
            name="Login"
            component={Screen.Login}
            options={Option.authOptions}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

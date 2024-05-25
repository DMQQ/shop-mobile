import {
  CommonActions,
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
import SCREENS from "constants/routes";

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
        fallback={<></>}
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
      initialRouteName={isLoggedIn ? SCREENS.HOME : SCREENS.LANDING}
      screenOptions={{
        ...Option.defaultStackOptions,
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.text,
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name={SCREENS.HOME}
            component={Screen.Home}
            options={Option.homeScreenOptions}
          />
          <Stack.Screen name={SCREENS.AUCTIONS} component={Screen.Auctions} />
          <Stack.Screen name={SCREENS.UPLOAD} component={Screen.Upload} />
          <Stack.Screen
            name={SCREENS.AUCTION}
            component={Screen.Auction}
            options={Option.auctionOptions}
          />
          <Stack.Screen
            name={SCREENS.CART}
            component={Screen.Cart}
            initialParams={{ sharedID: SCREENS.CART }}
            options={Option.cartScreenOptions}
            sharedElements={({ params }, opt) => {
              if ([SCREENS.PRODUCT, SCREENS.CART].includes(opt.name as any)) {
                return !!params.selectedProductId
                  ? ["prod_id." + params.selectedProductId + params.sharedID]
                  : ["prod_id." + params.prod_id + params.sharedID];
              }
            }}
          />

          <Stack.Screen
            component={Screen.User}
            name={SCREENS.USER}
            options={() => Option.userScreenOptions(name)}
          />

          <Stack.Screen
            component={Screen.Watchlist}
            options={Option.watchlistScreenOptions}
            name={SCREENS.WATCHLIST}
          />
          <Stack.Screen
            component={Screen.ProductDetails}
            name={SCREENS.PRODUCT}
            options={Option.detailsScreenOptions}
            sharedElements={({ params }, opt) => {
              const { prod_id, sharedID, isSharedAnimationUsed } = params;
              const valid = [
                SCREENS.HOME,
                SCREENS.SEARCH,
                SCREENS.SEARCH_RESULTS,
                SCREENS.PURCHASE_HISTORY,
                // SCREENS.PRODUCT, // dont use shared animation on product screen itself
                SCREENS.WATCHLIST,
                SCREENS.CART,
                SCREENS.PRODUCTS,
                SCREENS.SEARCH,
              ];

              if (
                sharedID &&
                valid.includes(opt.name as any) &&
                isSharedAnimationUsed
              ) {
                return ["prod_id." + prod_id + sharedID];
              }
            }}
          />

          <Stack.Screen
            name={SCREENS.CHECKOUT}
            component={Screen.Checkout}
            options={Option.checkOutScreenOptions}
          />
          <Stack.Screen
            name={SCREENS.SEARCH_RESULTS}
            component={Screen.SearchResults}
            options={({ route }) => ({
              title: `Looking for: ${route.params.category}`,
            })}
          />
          <Stack.Screen
            name={SCREENS.CREATE_REVIEW}
            component={Screen.CreateReview}
            sharedElements={(route) => {
              const { prod_id, sharedID } = route.params;
              return ["prod_id." + prod_id + sharedID];
            }}
            options={Option.createReviewOptions}
          />
          <Stack.Screen
            name={SCREENS.PRODUCT_REVIEWS}
            component={Screen.ProductReviews}
            options={Option.productReviewsOption}
          />
          <Stack.Screen
            name={SCREENS.MY_REVIEWS}
            component={Screen.MyReviews}
            options={Option.myReviewsOption}
          />
          <Stack.Screen
            name={SCREENS.ACCOUNT_SETTINGS}
            component={Screen.AccountSettings}
            options={Option.accountSettingsOption}
          />
          <Stack.Screen
            name={SCREENS.SEARCH}
            component={Screen.SearchScreen}
            options={Option.searchOptions}
          />
          <Stack.Screen
            name={SCREENS.PURCHASE_HISTORY}
            component={Screen.PurchaseHistory}
            options={Option.purchaseHistoryOption}
            sharedElements={(route) => {
              const { sharedID, prod_id } = route.params;
              return ["prod_id." + prod_id + sharedID];
            }}
          />

          <Stack.Screen name={SCREENS.PRODUCTS} component={Screen.Products} />
        </>
      ) : (
        <>
          <Stack.Screen
            name={SCREENS.LANDING}
            component={Screen.Landing}
            options={Option.landingOptions}
          />

          <Stack.Screen
            name={SCREENS.REGISTER}
            component={Screen.Register}
            options={Option.authOptions}
          />
          <Stack.Screen
            name={SCREENS.LOGIN}
            component={Screen.Login}
            options={Option.authOptions}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

import React, { useLayoutEffect, useRef } from "react";
import { View, Alert, VirtualizedList } from "react-native";
import Purchase from "./components/CartDetails";
import CartList from "./components/CartList";
import useColorTheme from "@utils/context/ThemeContext";
import { useCart } from "./hooks/useCart";
import { ScreenNavigationProps } from "/@types/types";
import useRemoveCart from "./hooks/useRemoveCart";
import { IconButton } from "components";
import { Feather } from "@expo/vector-icons";

export default function Cart({
  navigation,
  route,
}: ScreenNavigationProps<"Cart">) {
  const { theme } = useColorTheme();
  const { cart, total, ...restUseCartProps } = useCart();

  const { removeAll } = useRemoveCart();

  const clearCart = () =>
    Alert.alert(
      "Are you sure you want to remove all products from cart?",
      "Action cannot be undone",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: removeAll,
          style: "destructive",
        },
      ]
    );

  const cartListRef = useRef<VirtualizedList<any> | null>(null);

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: `Cart (${cart.length})`,
      headerTitleAlign: "center",
      headerRight: () =>
        cart.length > 0 ? (
          <IconButton
            hideBackground
            onPress={clearCart}
            icon={<Feather name="trash" size={20} color="white" />}
          />
        ) : null,
    });
  }, [cart.length]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <CartList ref={cartListRef} data={cart} {...restUseCartProps} />
      <Purchase cart={cart} total={total} />
    </View>
  );
}

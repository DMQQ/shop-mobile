import React from "react";
import {
  VirtualizedList,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import Product, { ProductTypeProps } from "../Product";
import { Text } from "react-native";
import useCartDelete from "./useCartDelete";
import text from "./styles";

interface CartProps extends ProductTypeProps {
  cart_id: number;
}

interface CartListProps {
  updateCartState: (id: number) => void;
  data: CartProps[];
}

const getItem = (data: CartProps[], key: number) => {
  return data[key];
};

export default function CartList({ updateCartState, data }: CartListProps) {
  const removeCartProduct = useCartDelete();

  const { width } = useWindowDimensions();
  return (
    <VirtualizedList
      testID="cart-list"
      ListEmptyComponent={
        <Image
          source={require("@assets/Shopping_Cart.png")}
          style={{ width, height: 400 }}
        />
      }
      showsVerticalScrollIndicator={false}
      getItem={getItem}
      initialNumToRender={3}
      getItemCount={(data) => data.length}
      keyExtractor={({ prod_id }) => prod_id.toString()}
      data={data}
      renderItem={({ item }) => (
        <View
          style={{ position: "relative" }}
          testID="CART.ELEMENT"
          accessibilityLabel="Item"
        >
          <Product
            route="Cart"
            deleteFn={() => removeCartProduct(item.cart_id)}
            sharedID="CartItems"
            RefetchCart={updateCartState}
            fullSize
            {...item}
          />
          <Text style={text}>{item.ammount}</Text>
        </View>
      )}
    />
  );

  // Nice looking layout animation

  /* return (
    <Animated.ScrollView layout={Layout}>
      {data.map((item) => (
        <Animated.View
          key={item.cart_id}
          style={{ position: "relative" }}
          layout={Layout.delay(200)}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Product
            route="Cart"
            deleteFn={() => removeCartProduct(item.cart_id)}
            sharedID="CartItems"
            RefetchCart={RefreshCart}
            fullSize
            {...item}
          />
          <Text style={text}>{item.ammount}</Text>
        </Animated.View>
      ))}
    </Animated.ScrollView>
  ); */
}

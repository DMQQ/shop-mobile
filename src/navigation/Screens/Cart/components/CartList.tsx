import React, { useState, forwardRef, useCallback } from "react";
import { VirtualizedList, Image, View, StyleSheet } from "react-native";
import { CartProps } from "/@types/types";
import Loader from "./Loader";
import CartProduct from "./CartProduct";
import layout from "constants/layout";

const styles = StyleSheet.create({
  footer: {
    height: layout.screen.height - 225,
    alignItems: "center",
    justifyContent: "center",
  },
  footerImage: { width: layout.screen.width - 40, height: 350 },
});

interface CartListProps {
  data: CartProps[];
  onEndReached: () => void;
  isLoading: boolean;
  isFetchingMore: boolean;
}

const getItem = (data: CartProps[], key: number) => {
  return data[key];
};

const ListEmptyComponent = () => (
  <View style={styles.footer}>
    <Image
      source={require("@assets/Shopping_Cart.png")}
      style={styles.footerImage}
    />
  </View>
);

const CartList = forwardRef<VirtualizedList<any>, CartListProps>(
  ({ data, onEndReached, isLoading }, ref) => {
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    function handleToggleSelect(value: boolean, product: CartProps) {
      value
        ? setSelectedProducts([...selectedProducts, product.prod_id])
        : setSelectedProducts(
            selectedProducts.filter((id) => id !== product.prod_id)
          );
    }

    const renderItem = useCallback(
      ({ item, index }: { item: CartProps; index: number }) => (
        <CartProduct
          productIndex={index}
          handleShowCheckbox={() => setShowCheckboxes((prev) => !prev)}
          showCheckbox={showCheckboxes}
          isProductSelected={selectedProducts.includes(item.prod_id)}
          handleSelectProduct={(value) => handleToggleSelect(value, item)}
          product={item}
        />
      ),
      [selectedProducts]
    );

    if (isLoading) {
      return <Loader />;
    }
    return (
      <VirtualizedList
        ref={ref}
        removeClippedSubviews
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        getItem={getItem}
        initialNumToRender={5}
        getItemCount={(data) => data.length}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        data={data}
        renderItem={renderItem}
      />
    );
  }
);

export default CartList;

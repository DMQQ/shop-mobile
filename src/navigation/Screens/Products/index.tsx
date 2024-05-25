import layout from "constants/layout";
import { Product as IProduct, ScreenNavigationProps } from "/@types/types";
import InfiniteScroll from "modules/InfiniteScroll";
import Product from "modules/Product";
import { View } from "react-native";
import {
  PRODUCT_CONTAINER_SIZE_X,
  PRODUCT_CONTAINER_SIZE_Y,
} from "modules/Product/assets";
import { useCallback } from "react";
import { Colors } from "constants/styles";

export default function Products({ route }: ScreenNavigationProps<"Products">) {
  const renderItem = useCallback(
    ({ item, index }: any) => (
      <Product
        {...item}
        sharedID={"Products"}
        fullSize
        style={{
          width: layout.screen.width - 25,
        }}
      />
    ),
    []
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: Colors.primary }}>
      <InfiniteScroll
        placeholderDimenssions={{
          width: PRODUCT_CONTAINER_SIZE_X,
          height: PRODUCT_CONTAINER_SIZE_Y,
        }}
        removeClippedSubviews
        windowSize={15}
        initialNumToRender={5}
        getItem={(item, index) => item[index]}
        onEndReachedThreshold={0.5}
        snapToInterval={layout.screen.width - 20}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItemLayout={(_, index) => ({
          index,
          length: PRODUCT_CONTAINER_SIZE_Y + 10,
          offset: (PRODUCT_CONTAINER_SIZE_Y + 10) * index,
        })}
        orientation="vertical"
        path={(route.params.path as `/${string}`) || "/products"}
        renderItem={renderItem}
        decelerationRate={"normal"}
        keyExtractor={(item: IProduct) => item.prod_id.toString()}
      />
    </View>
  );
}

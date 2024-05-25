import React, { memo, useCallback } from "react";
import { View, Text, VirtualizedList } from "react-native";
import Product from "../Product";
import { ProductTypeProps } from "../Product";
import caruselStyles from "./caruselStyles";
import { notEmpty } from "../../functions/typecheckers";
import EmptyList from "./Info";
import useFetchProducts from "./useFetchProducts";
import ProductSkeleton from "modules/ProductSkeleton";
import useColorTheme from "utils/context/ThemeContext";
import {
  PRODUCT_CONTAINER_SIZE_X,
  PRODUCT_WIDTH_FULLSIZE,
} from "modules/Product/assets";
import layout from "constants/layout";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";
import { API } from "constants/routes";

interface MostRecentProps {
  path: string;
  title: string;
  sharedID: string;
  refresh: boolean;
  center?: boolean;

  orientation?: "vertical" | "horizontal";
}

const getItem = (data: ProductTypeProps[], key: number) => {
  return data[key];
};

function ProductsCarusel({
  path,
  title,
  sharedID,
  orientation = "horizontal",
  center = false,
}: MostRecentProps) {
  const { theme } = useColorTheme();
  const { data, loading, onEndReached, error } = useFetchProducts(path);
  const isError = !!error && !loading && data.length === 0;
  const isLoading = !notEmpty(data) && loading;
  const productMargin = 5;
  const gaps =
    (layout.screen.width - (PRODUCT_CONTAINER_SIZE_X + productMargin * 2)) / 2;

  const snapToOffsets = data.map(
    (_, index) => index * (PRODUCT_CONTAINER_SIZE_X + 10) - gaps
  );

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <Product
        {...item}
        sharedID={sharedID}
        fullSize={center}
        style={{
          marginRight: data.length - 1 === index ? 10 : undefined,
        }}
      />
    ),
    []
  );

  const navigation = useNavigation<useNavigationProps>();

  return (
    <View style={caruselStyles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[caruselStyles.title, { color: theme.text }]}>
          {title}
        </Text>

        <Ripple
          onPress={() =>
            navigation.navigate("Products", { path: path.replace(API, "") })
          }
        >
          <Text style={[{ color: "#fff" }]}>See all</Text>
        </Ripple>
      </View>

      {isLoading && <ProductSkeleton />}

      {isError && <EmptyList variant="error" error={""} />}

      <VirtualizedList
        removeClippedSubviews
        maxToRenderPerBatch={60}
        updateCellsBatchingPeriod={100}
        windowSize={5}
        initialNumToRender={2}
        //
        //
        decelerationRate={0.95}
        onEndReachedThreshold={0.75}
        snapToInterval={layout.screen.width - 20}
        snapToOffsets={snapToOffsets}
        data={data}
        onEndReached={onEndReached}
        horizontal={orientation === "horizontal"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        getItem={getItem}
        getItemCount={(data) => data.length}
        getItemLayout={(_, index) => ({
          index,
          length: PRODUCT_WIDTH_FULLSIZE,
          offset: (PRODUCT_WIDTH_FULLSIZE + 10) * index,
        })}
        keyExtractor={(item: ProductTypeProps) => item.prod_id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

export default memo(ProductsCarusel);

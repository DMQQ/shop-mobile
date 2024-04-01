import { VirtualizedList, View, Image, Text } from "react-native";
import ProductTile, { TILE_WIDTH } from "./ProductTile";
import { useCallback, useState } from "react";
import type {
  Product,
  ProductImageProps,
  ProductMinified,
} from "/@types/types";
import { useAppSelector } from "utils/hooks/hooks";
import { wait } from "functions/wait";
import { MasonryFlashList } from "@shopify/flash-list";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Colors } from "constants/styles";
import Button from "components/ui/Button/Button";
import { image } from "functions/image";
import Color from "color";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import layout from "constants/layout";
import { FlatList } from "react-native-gesture-handler";
import ButtonsBar from "modules/DailySale/components/Buttonsbar";
import Ripple from "react-native-material-ripple";

interface ProductsListProps {
  data: ProductMinified[];
  onEndReached: () => void;

  setSelected: (prod: ProductMinified) => void;
  selectedProduct: ProductMinified | null;

  sheetRef: React.MutableRefObject<BottomSheet | null>;
}

export default function ProductsList({
  data,
  onEndReached,
  selectedProduct,
  setSelected,
  sheetRef,
}: ProductsListProps) {
  const cart = useAppSelector((state) => state.cart);

  const backdropComponent = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <>
      <View style={{ flex: 1 }}>
        <MasonryFlashList
          numColumns={2}
          data={data}
          keyExtractor={(key) => key.prod_id.toString()}
          onEndReached={onEndReached}
          estimatedItemSize={TILE_WIDTH}
          renderItem={({ item, index }) => (
            <ProductTile
              isExpanded={false}
              listIndex={index}
              product={item}
              onPress={() => {
                setSelected(item);
              }}
            />
          )}
        />
      </View>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backgroundStyle={{ backgroundColor: Colors.primary }}
        style={{ paddingHorizontal: 10, justifyContent: "space-between" }}
        snapPoints={["65%"]}
        backdropComponent={backdropComponent}
      >
        <Text style={{ fontSize: 10, color: "gray", textAlign: "right" }}>
          Product id: {selectedProduct?.prod_id}
        </Text>
        <Text
          textBreakStrategy="highQuality"
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          {selectedProduct?.title}
        </Text>

        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            style={{
              marginTop: 10,
              height: 130,
              flexGrow: 0,
            }}
            horizontal
            data={selectedProduct?.images || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <Image
                resizeMode="center"
                source={image(item.name)}
                style={{
                  width: layout.screen.width / 2,
                  marginRight: 10,
                  borderRadius: 5,
                  height: 130,
                }}
              />
            )}
          />

          <View style={{ flex: 1, paddingVertical: 10 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Prices
            </Text>

            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                {selectedProduct?.price}$
              </Text>
            </View>

            <Ripple
              style={{
                padding: 10,
                paddingHorizontal: 15,
                backgroundColor: Color(Colors.secondary)
                  .darken(0.75)
                  .desaturate(0.5)
                  .hex(),
                borderRadius: 15,
                marginTop: 20,
                width: "55%",
              }}
            >
              <Text
                style={{
                  color: Colors.secondary,
                  fontSize: 18,
                }}
              >
                Enable notifications
              </Text>
            </Ripple>
          </View>
        </View>

        {selectedProduct && (
          <ButtonsBar
            prod_id={selectedProduct?.prod_id}
            product={cart.cart.find(
              (p) => p.prod_id === selectedProduct?.prod_id
            )}
          />
        )}
      </BottomSheet>
    </>
  );
}

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { View, RefreshControl } from "react-native";
import ImagesCarusel from "@components/ImagesCarusel/ImagesCarusel";
import { Product, ScreenNavigationProps } from "/@types/types";
import styles from "./styles";
import useColorTheme from "@utils/context/ThemeContext";
import ProductSuggestion from "./components/ProductSuggestion";
import BottomTab from "./components/BottomTab";
import Details from "./components/Details";
import useProduct from "./hooks/useProduct";
import CartSheet from "@modules/Cart/CartSheet";

import BottomSheet from "@gorhom/bottom-sheet";
import { useAppSelector } from "utils/hooks/hooks";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ImagesModal from "./components/ImagesModal";
import useListenBackPress from "utils/hooks/useListenBackPress";
import useInteractionManager from "./hooks/useInteractionManager";

export default function ProductDetails({
  route,
  navigation,
}: Required<ScreenNavigationProps<"Product">>) {
  const { prod_id, image, sharedID, title } = route.params;

  const isQuerySkipped = useInteractionManager(navigation, prod_id, title);

  const { data, refetch, loading } = useProduct(prod_id, title, isQuerySkipped);
  const product = data?.product;

  const images = (() => {
    if (typeof image === "undefined") return product?.images || [];

    const fetchedImages = [...(product?.images || [])].splice(1);

    return [{ id: 0, name: image?.split("=")[1] }, ...fetchedImages];
  })();

  const { theme } = useColorTheme();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch({ prod_id, name: title.split(" ").slice(0, 2).join(" ") });
    setRefreshing(false);
  }, []);

  const { cart } = useAppSelector((state) => state.cart);

  const cartProduct = useMemo(
    () => cart.find((item) => item.prod_id === prod_id),
    [cart]
  );

  const headerOpacity = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const onListScroll = useAnimatedScrollHandler({
    onScroll(event, context) {
      const { contentOffset } = event;
      const { y } = contentOffset;

      if (y > 300) {
        // image +- 250px + title component height
        headerOpacity.value = withTiming(1, { duration: 200 });
      } else {
        headerOpacity.value = withTiming(0, { duration: 200 });
      }
    },
  });

  const sheetRef = useRef<BottomSheet | null>(null);

  useEffect(() => {
    if (typeof cartProduct === "undefined") sheetRef.current?.close();
  }, [cartProduct]);

  const [imagesModalVisible, setImagesModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Animated.Text
          style={[
            { color: "#fff", paddingHorizontal: 10, fontSize: 18 },
            headerAnimatedStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Animated.Text>
      ),
    });
  }, [title]);

  useListenBackPress(() => {
    if (imagesModalVisible) setImagesModalVisible(false);
    return imagesModalVisible;
  }, [imagesModalVisible]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <Animated.ScrollView
        onScroll={onListScroll}
        style={[styles.container, { backgroundColor: theme.primary }]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImagesCarusel
          onPress={(index) => {
            setImagesModalVisible(true);
          }}
          {...{ sharedID, prod_id, images }}
        />

        <Details
          {...product}
          image={image}
          sharedID={sharedID}
          isLoading={loading}
        />

        <ProductSuggestion data={data?.suggestions || []} text={title} />
      </Animated.ScrollView>

      <BottomTab
        onCartUpdate={() => sheetRef.current?.expand()}
        prod_id={prod_id}
        quantity={product?.quantity || 0}
      />

      <CartSheet
        cartProduct={cartProduct}
        onDismiss={() => sheetRef.current?.close()}
        product={{ ...(product as Product), images: images }}
        ref={(ref) => (sheetRef.current = ref)}
      />

      <ImagesModal
        onClose={() => setImagesModalVisible(false)}
        visible={imagesModalVisible}
        images={images}
      />
    </View>
  );
}

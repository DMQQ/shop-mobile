import { useState, useCallback, useRef, useEffect } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import ImagesCarusel from "@components/ImagesCarusel/ImagesCarusel";
import { Product, ScreenNavigationProps } from "/@types/types";
import styles from "./styles";
import useColorTheme from "@utils/context/ThemeContext";
import ProductSuggestion from "./components/Suggestions/ProductSuggestion";
import BottomTab from "./components/BottomTab/BottomTab";
import { wait } from "functions/wait";
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
import { IconButton } from "components";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function ProductDetails({
  route,
  navigation,
}: Required<ScreenNavigationProps<"Product">>) {
  const { prod_id, image, sharedID, title, isSharedAnimationUsed } =
    route.params;

  const { data, refetch, loading } = useProduct(prod_id);
  const result = data?.product;

  const images = [
    { id: 0, name: image?.split("=")[1] },
    ...(result?.img_id || []),
  ];

  const { theme } = useColorTheme();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch({ prod_id });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const sheetRef = useRef<BottomSheet | null>(null);
  const { cart } = useAppSelector((state) => state.cart);

  const cartProduct = cart.find((item) => item.prod_id === prod_id);

  const headerOpacity = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const onListScroll = useAnimatedScrollHandler({
    onScroll(event, context) {
      const { contentOffset } = event;
      const { y } = contentOffset;

      if (y > 300) {
        headerOpacity.value = withTiming(1, { duration: 200 });
      } else {
        headerOpacity.value = withTiming(0, { duration: 200 });
      }
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Animated.Text
          style={[
            { color: "#fff", paddingHorizontal: 10, fontSize: 19 },
            headerAnimatedStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Animated.Text>
      ),
      headerRight: () => (
        <IconButton
          hideBackground
          icon={<Entypo name="dots-three-vertical" size={20} color="white" />}
          onPress={() => {}}
        />
      ),
    });
  }, []);

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
        <ImagesCarusel {...{ sharedID, prod_id, images }} />

        <Details
          {...result}
          prod_id={prod_id}
          image={image}
          title={title}
          sharedID={sharedID}
          isLoading={loading}
        />

        <ProductSuggestion text={result?.title} />
      </Animated.ScrollView>

      <BottomTab
        onCartUpdate={() => sheetRef.current?.snapToIndex(0)}
        prod_id={prod_id}
        quantity={result?.quantity || 0}
      />

      <CartSheet
        cartProduct={cartProduct}
        onDismiss={() => sheetRef.current?.close()}
        product={{ ...(result as Product), prod_id, img_id: images }}
        ref={(ref) => (sheetRef.current = ref)}
      />
    </View>
  );
}

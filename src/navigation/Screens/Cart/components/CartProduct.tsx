import { CartProps, useNavigationProps } from "/@types/types";
import { Pressable, Text, TouchableOpacity, StyleSheet } from "react-native";
import { image } from "functions/image";
import layout from "constants/layout";
import { Fonts } from "constants/styles";
import { useNavigation } from "@react-navigation/native";
import {
  CartAddIconButton,
  CartRemoveIconButton,
} from "modules/Cart/IconButtons";

import Animated, { FadeInDown } from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";

const styles = StyleSheet.create({
  container: {
    width: layout.screen.width,
    padding: 5,
    paddingHorizontal: 5,
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    flex: 2.5,
    height: "100%",
    borderRadius: 5,
  },
  content_container: {
    flex: 3,
    paddingHorizontal: 5,
    paddingLeft: 10,
    justifyContent: "flex-start",
  },
  price: {
    color: "#fff",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    lineHeight: 18,
  },
});

interface CartProductProps {
  product: CartProps;

  productIndex?: number;

  handleSelectProduct: (value: boolean) => void;

  isProductSelected: boolean;

  showCheckbox: boolean;

  handleShowCheckbox: () => void;
}

export default function CartProduct({
  product,
  handleSelectProduct,
  isProductSelected,
  showCheckbox,
  handleShowCheckbox,
  productIndex = 0,
}: CartProductProps) {
  const navigation = useNavigation<useNavigationProps>();

  const img = image(product.images);

  const delay = productIndex * 50; //ms

  const sharedID = "Cart";

  const navigate = () => {
    navigation.push("Product", {
      sharedID: sharedID,
      title: product.title,
      prod_id: product.prod_id,
      image: img.uri,
      isSharedAnimationUsed: true,
      // previousScreen: "Cart",
    });
  };

  const onLongPress = () => {
    handleShowCheckbox();
    handleSelectProduct(true);
  };

  return (
    <TouchableOpacity
      delayLongPress={500}
      onLongPress={onLongPress}
      activeOpacity={0.8}
      onPress={navigate}
      style={[
        styles.container,
        {
          marginTop: showCheckbox ? 10 : 0,
        },
      ]}
    >
      <SharedElement
        style={styles.image}
        id={`prod_id.${product.prod_id}${sharedID}`}
      >
        <Animated.Image
          resizeMethod="resize"
          resizeMode="center"
          entering={FadeInDown.delay(delay)}
          style={styles.image}
          source={img}
        />
      </SharedElement>
      <Animated.View
        entering={FadeInDown.delay(delay)}
        style={styles.content_container}
      >
        <Text numberOfLines={3} style={styles.title}>
          {product.title}
        </Text>
        <Animated.Text entering={FadeInDown.delay(delay)} style={styles.price}>
          ${product.price}
        </Animated.Text>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(delay)}>
        <Pressable style={{ flex: 0.5, alignItems: "center" }}>
          <CartAddIconButton
            prod_id={product.prod_id}
            isDisabled={product.ammount > 100} // TODO: change to product.quantity
          />
          <Text style={{ color: "#fff", fontSize: 16, paddingVertical: 5 }}>
            {product.ammount}
          </Text>
          <CartRemoveIconButton cart_id={product.cart_id} />
        </Pressable>
      </Animated.View>
    </TouchableOpacity>
  );
}

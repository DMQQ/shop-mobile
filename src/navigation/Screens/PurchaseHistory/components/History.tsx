import { View, StyleSheet, Text, Image } from "react-native";
import { API } from "constants/routes";
import { useNavigation } from "@react-navigation/native";
import { Product, useNavigationProps } from "/@types/types";
import { IHistory } from "../hooks/usePurchaseHistory";
import { image } from "functions/image";
import { Colors, h2 } from "constants/styles";
import Ripple from "react-native-material-ripple";
import layout from "constants/layout";
import { memo, useMemo } from "react";
import { SharedElement } from "react-navigation-shared-element";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 5,
    flexDirection: "column",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 75,
    borderRadius: 5,
  },
});

const sharedID = "history";

export default function History({ products, date, total_price }: IHistory) {
  const navigation = useNavigation<useNavigationProps>();

  function onPushRoute(product: Product) {
    navigation.push("Product", {
      image: `${API}/upload/images=${product.images[0].name}`,
      prod_id: product.prod_id,
      sharedID,
      title: product.title,
      isSharedAnimationUsed: true,
    });
  }

  const listOfProductsToDisplay = useMemo(() => {
    const prods = new Map<string, { product: Product; quantity: number }>();

    for (const product of products) {
      if (prods.get(product.prod_id?.prod_id.toString()!)) {
        prods.set(product.prod_id?.prod_id.toString()!, {
          product: product.prod_id!,
          quantity:
            prods.get(product.prod_id?.prod_id.toString()!)?.quantity! + 1,
        });
      } else {
        prods.set(product.prod_id?.prod_id.toString()!, {
          product: product.prod_id!,
          quantity: 1,
        });
      }
    }

    return Array.from(prods.values());
  }, [products]);

  return (
    <View style={[styles.container, { marginBottom: 20 }]}>
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.primary_light,
          borderRadius: 15,
        }}
      >
        <ListOfProducts
          onPress={(n) => onPushRoute(n)}
          list={listOfProductsToDisplay}
        />

        <Text style={{ color: "#fff", marginTop: 10 }}>
          {new Date(+date!).toDateString()}
        </Text>
        <Text style={[h2, { fontSize: 18, lineHeight: 30 }]}>
          Total: ${total_price}{" "}
        </Text>
      </View>
    </View>
  );
}

const ListOfProducts = memo(
  ({
    list,
    onPress,
  }: {
    list: { product: Product; quantity: number }[];
    onPress: (n: Product) => void;
  }) => (
    <>
      {list?.map((arg) => {
        const product = arg.product as Product;
        return (
          <Ripple
            onPress={() => onPress(product)}
            key={arg.product.prod_id}
            style={{
              flexDirection: "row",
              marginBottom: 10,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <SharedElement id={`prod_id.${product.prod_id}${sharedID}`}>
              <Image
                source={image(product.images[0].name)}
                style={styles.image}
                resizeMode="contain"
              />
            </SharedElement>
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{ color: "#fff" }}
                numberOfLines={2}
                textBreakStrategy="simple"
              >
                {product.title}
              </Text>
              <Text style={{ color: "#fff" }}>${product.price}</Text>

              <Text style={{ color: "#fff" }}>Quantity: {arg.quantity}</Text>
            </View>
          </Ripple>
        );
      })}
    </>
  )
);

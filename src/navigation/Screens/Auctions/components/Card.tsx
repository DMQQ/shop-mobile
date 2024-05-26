import { ProductImageProps, useNavigationProps } from "/@types/types";
import { image } from "functions/image";
import { View, StyleSheet, Image, Text } from "react-native";
import { Colors, Fonts } from "constants/styles";
import Ripple from "react-native-material-ripple";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  side: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.primary_light,
  },
  title: {
    color: "#fff",
    fontFamily: Fonts.PoppinsBold,
    fontSize: 17,
  },
  text: {
    color: "#fff",
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 15,
  },
});

interface CardProps {
  navigation: useNavigationProps;
  auction_id: string;
  bids: {
    amount: number;
  }[];
  product: {
    title: string;
    category: string;
    images: ProductImageProps[];
  };
}

export default function Card({
  product,
  bids,
  navigation,
  auction_id,
}: CardProps) {
  return (
    <Ripple
      style={styles.container}
      onPress={() =>
        navigation.navigate("Auction", {
          auction_id,
        })
      }
    >
      <View style={{ padding: 10 }}>
        <Image
          style={styles.thumbnail}
          source={image(product.images)}
          resizeMode="contain"
        />
      </View>
      <View style={styles.side}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.text}>
          Highest bid{" "}
          <Text style={{ color: Colors.secondary, fontSize: 18 }}>
            ${bids?.[0]?.amount || "No bid"}
          </Text>
        </Text>
      </View>
    </Ripple>
  );
}

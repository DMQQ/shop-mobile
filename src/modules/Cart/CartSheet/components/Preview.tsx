import { View, Text, Image } from "react-native";
import styles from "../styles";
import type { Product } from "/@types/types";
import { image } from "functions/image";

interface PreviewProps {
  product: Partial<Product>;
}

export default function Preview({ product }: PreviewProps) {
  return (
    <View style={styles.preview_container}>
      <Image
        source={image(product?.images)}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.text_column}>
        <Text style={styles.product_title}>{product?.title}</Text>
        <Text style={{ color: "#fff" }}>${product?.price}</Text>
      </View>
    </View>
  );
}

import { ThemedText } from "components";
import { Fonts } from "constants/styles";
import { View } from "react-native";
import styles from "../styles";

export default function Headings() {
  return <></>;
}

Headings.Title = (props: { text: string }) => (
  <ThemedText
    style={{
      fontSize: 20,
      marginLeft: 10,
      fontFamily: Fonts.PoppinsRegular,
    }}
  >
    {props.text}
  </ThemedText>
);

Headings.Price = (props: { price: number; quantity: number }) => (
  <View style={{ flex: 1, width: "100%" }}>
    <ThemedText style={styles.discounted}>
      Before ${Math.ceil((props.price || 0) * 1.25)}
    </ThemedText>
    <View style={[styles.row, { justifyContent: "space-between" }]}>
      <ThemedText style={[styles.price]}>${props.price}</ThemedText>
      <ThemedText>{props.quantity} Left</ThemedText>
    </View>
  </View>
);

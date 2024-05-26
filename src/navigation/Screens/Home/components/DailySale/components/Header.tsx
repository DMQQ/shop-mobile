import { View, Text } from "react-native";
import styles from "../styles";
import Clock from "@components/Clock";

export default function Header() {
  return (
    <View style={[styles.row, { justifyContent: "space-between" }]}>
      <Text style={styles.title}>Promotion</Text>
      <Clock />
    </View>
  );
}

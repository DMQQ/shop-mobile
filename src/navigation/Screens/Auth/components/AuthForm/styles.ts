import { Dimensions, StyleSheet } from "react-native";
import { Colors, radius, Padding } from "@constants/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    marginTop: 5,
    textDecorationLine: "none",
  },
  btn: {
    width: SCREEN_WIDTH * 0.95,
    marginTop: 10,
    padding: 15,
    color: Colors.text,
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row-reverse",
  },
});

export default styles;

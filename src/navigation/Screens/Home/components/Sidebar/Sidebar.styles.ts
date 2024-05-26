import { Colors } from "@constants/styles";
import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    width: WIDTH * 0.6,
    height: HEIGHT,
  },
  head: {
    color: Colors.text,
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    marginBottom: 10,
    marginTop: 50,
  },
  button: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    width: WIDTH * 0.55,
    marginTop: 10,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  sidebar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    position: "relative",
  },
});

export default styles;

import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
  },
  row: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  image_container: {
    width: WIDTH,
    padding: 10,
  },
  image: {
    height: 240,
    padding: 10,
    borderRadius: 5,
  },
  saved: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: Colors.primary100,
    color: "#fff",
    fontSize: 25,
    zIndex: 20,
    padding: 5,
  },
  details: {
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 5,
  },
  button: {},
  discounted: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 18,
    textDecorationLine: "line-through",
  },
});

export default styles;

import { PRODUCT_CONTAINER_SIZE_Y } from "modules/Product/assets";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const caruselStyles = StyleSheet.create({
  nothing: {
    backgroundColor: Colors.primary,
    height: HEIGHT / 3,
    width: WIDTH - 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontFamily: "PoppinsBold",
    color: Colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 35,
    paddingLeft: 5,
    marginBottom: 5,
  },
  container: {
    width: WIDTH,
    height: 320,
    marginTop: 20,
    flex: 1,
    flexGrow: 1,
  },
});

export default caruselStyles;

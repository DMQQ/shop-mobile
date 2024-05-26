import Color from "color";
import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "@constants/styles";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
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
    fontFamily: Fonts.PoppinsBold,
    marginLeft: 5,
    overflow: "hidden",
  },
  image_container: {
    width: WIDTH,
    padding: 10,
    position: "relative",
  },
  image: {
    height: 240,
    padding: 10,
    borderRadius: 5,
  },
  off: {
    position: "absolute",
    top: -5,
    left: 10,
    zIndex: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    color: "#fff",
    backgroundColor: Colors.secondary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,

    elevation: 7,
  },
  details: {
    justifyContent: "space-between",
  },
  price: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 5,
  },
  button: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    flexDirection: "row-reverse",
  },
  favourite: {
    padding: 15,
    marginRight: 10,
  },
  discounted: {
    fontSize: 15,
    color: "gray",
    marginLeft: 5,
  },
  bottom_tab: {
    width: WIDTH,
    padding: 10,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;

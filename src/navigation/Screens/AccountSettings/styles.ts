import { Fonts } from "constants/styles";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  heading: {
    fontSize: 30,
    fontFamily: Fonts.PoppinsBold,
  },
  block: {
    width: "100%",
    marginTop: 15,
  },
  blockLabel: {
    color: "#c4c4c4",
    fontSize: 18,
    fontFamily: Fonts.PoppinsMedium,
  },
  blockText: {
    color: "white",
    fontSize: 20,
    fontFamily: Fonts.PoppinsMedium,
  },
  blockRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
});

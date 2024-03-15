import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
    fontFamily: "PoppinsRegular",
    color: "#fff",
    flex: 1,
    textDecorationLine: "none",
    minHeight: 50,
  },
  label: {
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
  },
});

export default styles;

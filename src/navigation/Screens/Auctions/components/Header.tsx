import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";
import { Button } from "components";
import { Colors, Fonts } from "constants/styles";
import { Text, View } from "react-native";

export default function Header() {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.primary_light,
      }}
    >
      <Text
        style={{ color: "#fff", fontSize: 20, fontFamily: Fonts.PoppinsBold }}
      >
        Dashboard
      </Text>
      <Button text="GO" callback={() => navigation.navigate("Dashboard")} />
    </View>
  );
}

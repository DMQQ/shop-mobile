import { Colors, Fonts } from "constants/styles";
import { Text } from "react-native";
import Ripple from "react-native-material-ripple";

export default function Edit({ onPress }: { onPress: () => void }) {
  return (
    <Ripple
      rippleCentered
      rippleColor="#fff"
      style={{
        borderRadius: 5,
        padding: 5,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: Colors.secondary,
          fontFamily: Fonts.PoppinsRegular,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Edit
      </Text>
    </Ripple>
  );
}

import { StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Padding } from "constants/styles";

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: Padding.large,
    backgroundColor: Colors.primary_light,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  buttonTextFaded: {
    marginRight: 5,
    color: "rgba(255,255,255,0.8)",
  },
});

interface SettingButtonProps {
  primaryText: string;
  fadedText: string;
  iconExpanded: boolean;
  onPress: () => void;
}

export default function SettingButton({
  fadedText,
  primaryText,
  iconExpanded,
  onPress,
}: SettingButtonProps) {
  return (
    <Ripple onPress={onPress} style={styles.button} rippleColor="#fff">
      <Text style={styles.buttonText}>{primaryText}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.buttonTextFaded}>{fadedText}</Text>

        <MaterialIcons
          name={`keyboard-arrow-${iconExpanded ? "down" : "right"}`}
          size={24}
          color="white"
        />
      </View>
    </Ripple>
  );
}

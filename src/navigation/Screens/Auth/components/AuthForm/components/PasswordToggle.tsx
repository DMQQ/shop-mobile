import { Entypo } from "@expo/vector-icons";
import { Colors, IconSize } from "@constants/styles";
import Ripple from "react-native-material-ripple";

interface PasswordToggleProps {
  setVissible: (arg: any) => void;
  vissible: boolean;

  isError?: boolean;

  isFocused?: boolean;
}

export default function PasswordToggle({
  setVissible,
  vissible,
  isError = false,
  isFocused = false,
}: PasswordToggleProps) {
  const color = isError ? "#ff3030" : isFocused ? Colors.active : "#fff";

  return (
    <Ripple
      style={{ paddingHorizontal: 5 }}
      rippleCentered
      onPress={() => setVissible((p: boolean) => !p)}
    >
      {!vissible ? (
        <Entypo name="eye" size={IconSize.small} color={color} />
      ) : (
        <Entypo name="eye-with-line" size={IconSize.small} color={color} />
      )}
    </Ripple>
  );
}

import Color from "color";
import layout from "constants/layout";
import { Colors } from "constants/styles";
import { View, Text } from "react-native";

const TILES_COUNT = 5;

const TILE_MARGIN = 5;

const TILE_WIDTH = layout.screen.width / TILES_COUNT - TILE_MARGIN * 2;

const TILE_DISABLED_COLOR = Colors.primary_light;

const calcPasswordStrength = (password: string): number => {
  let passwordStrength = 0;

  if (password.length >= 6) passwordStrength += 1;

  if (/[A-Z]/.test(password)) passwordStrength += 1;

  if (/[a-z]/.test(password)) passwordStrength += 1;

  if (/[0-9]/.test(password)) passwordStrength += 1;

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
    passwordStrength += 1;

  return passwordStrength;
};

const PASSWORD_STAGES = [
  ["Very weak", Colors.primary_light],
  ["Weak", Colors.error],
  ["Medium", "#DFD425"],
  ["Strong", Color(Colors.success).lighten(0.5).string()],
  ["Very strong", Colors.success],
];

export default function PasswordStrength({ password }: { password: string }) {
  const passwordStrength = calcPasswordStrength(password);

  const [text, color] =
    PASSWORD_STAGES[passwordStrength > 4 ? 4 : passwordStrength];

  return (
    <View style={{ marginVertical: 5 }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        {[...Array(TILES_COUNT)].map((_, index) => (
          <View
            key={index}
            style={{
              width: TILE_WIDTH,
              margin: TILE_MARGIN / 2,
              backgroundColor:
                index > passwordStrength - 1 ? TILE_DISABLED_COLOR : color,
              height: 5,
            }}
          />
        ))}
      </View>
      <Text
        style={{
          color: color,
          fontSize: 16,
          marginTop: 5,
          textAlign: "right",
        }}
      >
        {text}
      </Text>
    </View>
  );
}

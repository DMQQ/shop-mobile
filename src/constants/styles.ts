import Color from "color";
import { TextStyle } from "react-native";

export const radius = {
  small: 5,
  medium: 10,
  large: 15,
};

export const IconSize = {
  small: 20,
  medium: 22,
  large: 25,
};

export const Padding = {
  small: 5,
  medium: 10,
  large: 15,
  extraLarge: 20,
};

export const Fonts = {
  PoppinsBold: "PoppinsBold",
  PoppinsThin: "PoppinsThin",
  PoppinsMedium: "PoppinsMedium",
  PoppinsRegular: "PoppinsRegular",
  PoppinsLight: "PoppinsLight",
  PoppinsBlack: "PoppinsBlack",
};

export const fontSize = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
  paragraph: 14,
  small: 12,
  xs: 10,
};

export const Colors = {
  text: "#fff",
  textFaded: "#b8b8b8",
  primary: "#0c0c0d",

  primary_light: "#161618",

  secondary: "#6289FF",

  secondary_light: Color("#6289FF").lighten(0.5).hex(),

  secondary_dark: Color("#6289FF").darken(0.5).hex(),

  active: "#36a8f5",

  accent: "#3B4157",

  success: "#4BB543",

  error: "#ff3030",
};

const textBase: TextStyle = {
  fontFamily: "PoppinsBold",
  color: Colors.text,
};

export const h1: TextStyle = {
  ...textBase,
  lineHeight: 90,
  fontSize: fontSize.h1,
};

export const h2: TextStyle = {
  ...textBase,
  lineHeight: 64,
  fontSize: fontSize.h2,
};

export const h3: TextStyle = {
  ...textBase,
  lineHeight: 45,
  fontSize: fontSize.h3,
};

export const h4: TextStyle = {
  ...textBase,
  lineHeight: 32,
  fontSize: fontSize.h4,
  fontWeight: "700",
};

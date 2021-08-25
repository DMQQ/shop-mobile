import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIHGT } = Dimensions.get("screen");

type OverlayProps = {
  close: () => void;
};

export default function Overlay({ close }: OverlayProps) {
  return <View style={[styles.overlay]} onTouchStart={close}></View>;
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIHGT,
  },
});

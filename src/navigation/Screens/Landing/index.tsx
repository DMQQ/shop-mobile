import React from "react";
import { View, Image, Text } from "react-native";
import { Colors, Fonts } from "../../../constants/styles";
import Button from "../../../components/ui/Button/Button";
import styles from "./styles";
import layout from "constants/layout";
import Color from "color";
import ScreenContainer from "components/ui/ScreenContainer";
import Svg, { Path } from "react-native-svg";
import { ThemedText } from "components";

export default function Landing({ navigation }: any) {
  function onNavigateLogin() {
    navigation.navigate("Login", {
      //  screen: "Login",
    });
  }

  function onNavigateRegister() {
    navigation.navigate(
      "Register"
      //   { screen: "Register" }
    );
  }
  return (
    <ScreenContainer style={[styles.container]}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 15,
          width: "100%",
        }}
      >
        <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          Hi there!
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 16,
            fontWeight: "400",
            color: "gray",
            marginTop: 10,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
          a, sunt ex fuga officiis fugit omnis error id aliquid velit atque.
          Obcaecati id accusantium beatae minus ex. Autem, illum a!
        </ThemedText>

        {/* GRID */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {["Electronic", "Accessories", "Home utilities", "Outdoor utils"].map(
            (key) => (
              <View
                key={key}
                style={{
                  // width: (layout.screen.width - 30 - 20) / 2,
                  // height: 150,
                  width: "48%",
                  height: "50%",
                  backgroundColor: Colors.primary_light,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <ThemedText style={{ fontSize: 19 }}>{key}</ThemedText>
              </View>
            )
          )}
        </View>
      </View>
      <View style={[styles.block, { width: layout.screen.width }]}>
        <Button
          type="contained"
          fontStyle={{ fontSize: 20 }}
          style={[
            styles.button,
            { backgroundColor: Colors.accent, borderRadius: 15 },
          ]}
          text="Login"
          callback={onNavigateLogin}
        />
        <Button
          variant="primary"
          type="contained"
          fontStyle={{ fontSize: 20 }}
          style={[styles.button, { borderRadius: 15 }]}
          text="Create an account"
          callback={onNavigateRegister}
        />
      </View>
    </ScreenContainer>
  );
}

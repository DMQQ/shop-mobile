import React, { useLayoutEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import useColorTheme from "@utils/context/ThemeContext";
import styles from "./styles";
import { Container, Header } from "@components/index";
import BottomSheet from "@gorhom/bottom-sheet";
import SettingsBottomSheet from "navigation/Screens/AccountSettings/components/SettingsSheet";
import Options from "./components/Options";

export type CurrentOptionType =
  | "NAME"
  | "ADDRESS"
  | "PHONE_NUMBER"
  | "SURNAME"
  | "";

export default function AccountSettings() {
  const { theme } = useColorTheme();
  const [option, setOption] = useState<CurrentOptionType>("");
  const [text, setText] = useState("");
  const sheetRef = useRef<null | BottomSheet>(null);

  function onSheetOpen(variant: CurrentOptionType) {
    sheetRef.current?.snapToIndex(0);
    setText("");
    setOption(variant);
  }

  function onSheetClose() {
    sheetRef.current?.close();
  }

  return (
    <Container>
      <Header />
      <View style={{ padding: 10 }}>
        <View style={styles.header}>
          <Text style={[styles.heading, { color: theme.text }]}>
            Account settings
          </Text>
        </View>

        <Options onSheetOpen={onSheetOpen} />
      </View>

      <SettingsBottomSheet
        option={option}
        onSheetClose={onSheetClose}
        setText={setText}
        text={text}
        ref={sheetRef}
      />
    </Container>
  );
}

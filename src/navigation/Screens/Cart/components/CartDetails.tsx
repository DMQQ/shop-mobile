import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProductMinified, useNavigationProps } from "/@types/types";
import { Button } from "@components/index";
import useColorTheme from "@utils/context/ThemeContext";
import Color from "color";
import { Colors } from "constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderTopWidth: 1,
  },
  content: {
    width: "90%",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontFamily: "PoppinsRegular",
  },
  button: {
    width: "95%",
    justifyContent: "center",
    padding: 15,
    marginTop: 10,
  },
});

interface CartProduct extends ProductMinified {
  ammount: number;
}

interface CartDetailsProps {
  cart: CartProduct[];
  total: number;
}

export default function CartDetails({ cart, total }: CartDetailsProps) {
  const navigation = useNavigation<useNavigationProps>();

  function PurchaseProduct() {
    navigation.push("Checkout", { cart, total });
  }

  const disabled = cart.length === 0;

  const { theme } = useColorTheme();

  const primaryLighten = Color(Colors.primary).lighten(0.5).string();

  return (
    <View
      style={[
        styles.container,
        {
          borderTopColor: primaryLighten,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.text, { color: theme.text }]}>Total:</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          ${total} + $9.99{" "}
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            size={22}
            color="#fff"
          />
        </Text>
      </View>
      <Button
        testID={"PURCHASE.BUTTON"}
        disabled={disabled}
        text="Checkout"
        callback={PurchaseProduct}
        fontStyle={{ color: "#fff" }}
        style={[
          {
            backgroundColor: !disabled ? theme.secondary : primaryLighten,
            borderRadius: 100,
          },
          styles.button,
        ]}
      />
    </View>
  );
}

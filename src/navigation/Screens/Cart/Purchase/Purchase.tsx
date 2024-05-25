import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { ProductMinified, useNavigationProps } from "../../../../@types/types";
import Button from "../../../../components/ui/Button/Button";
import useColorTheme from "@utils/context/ThemeContext";
import { CalcTotalCartPrice } from "../../../../functions/CalcTotalCartPrice";
import styles from "./Purchases.styles";
import Color from "color";
import { Colors } from "constants/styles";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

interface CartProduct extends ProductMinified {
  ammount: number;
}

interface PurchaseProps {
  cart: CartProduct[];
  total: number;
}

export default function Purchase({ cart, total }: PurchaseProps) {
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

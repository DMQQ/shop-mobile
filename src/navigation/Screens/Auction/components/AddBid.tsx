import { Button, Input } from "components";
import { Colors, Padding } from "constants/styles";
import { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import layout from "constants/layout";
import Ripple from "react-native-material-ripple";

import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    padding: Padding.medium,
    flexDirection: "row",
  },
  button: {
    marginBottom: 12,
    width: width / 2.5,
    justifyContent: "center",
    flexDirection: "row-reverse",
    marginRight: 10,
    alignItems: "center",
  },
});

interface AddBidProps {
  highest: number;
  auction_id: string;
  onBid: (amount: number, auction_id: string) => void;
  isLoading?: boolean;
}

export default function Addbid({
  highest,
  onBid,
  auction_id,
  isLoading = false,
}: AddBidProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  function handleBidSubmit() {
    onBid(+value, auction_id);

    setValue("");
    setTouched(false);
  }

  return (
    <View style={styles.container}>
      <Button
        disabled={isLoading}
        color="ternary"
        type="contained"
        style={[
          styles.button,
          {
            width: 65,
            marginRight: 0,
            marginLeft: 10,
          },
        ]}
        text="+ $5"
        onPress={() => onBid(highest + 5, auction_id)}
      />

      <Input
        placeholder="Place your bid"
        keyboardType="number-pad"
        value={value}
        onChangeText={setValue}
        onBlur={() => setTouched(true)}
        leftIcon={<FontAwesome5 name="money-check" size={20} color="white" />}
        rightIcon={
          <Ripple
            onPress={handleBidSubmit}
            disabled={+value <= highest || !touched || isLoading}
            style={{
              padding: 5,
              borderRadius: 100,
              backgroundColor: Colors.primary,
            }}
          >
            <Ionicons name="add-outline" size={24} color="white" />
          </Ripple>
        }
        style={{
          lineHeight: 20,
          width: layout.screen.width - 20 * 2 - 55,
        }}
      />
    </View>
  );
}

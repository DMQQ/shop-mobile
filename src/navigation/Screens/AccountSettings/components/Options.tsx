import { useAppSelector } from "utils/hooks/hooks";
import type { CurrentOptionType } from "../index";
import { Text, View } from "react-native";
import Edit from "./Edit";
import styles from "../styles";

interface OptionProps {
  onSheetOpen: (variant: CurrentOptionType) => void;
}

export default function Options({ onSheetOpen }: OptionProps) {
  const state = useAppSelector((state) => state.user.credentials);
  return (
    <>
      {["Name", "Surname", "Address", "Phone Number"].map((label, index) => (
        <View key={label} style={styles.block}>
          <Text style={styles.blockLabel}>{label}</Text>
          <View style={styles.blockRow}>
            <Text style={styles.blockText}>
              {
                state[
                  label
                    .toLocaleLowerCase()
                    .replace(" ", "_") as keyof typeof state
                ]
              }
            </Text>
            <Edit
              onPress={() =>
                onSheetOpen(
                  label.toUpperCase().replace(" ", "_") as CurrentOptionType
                )
              }
            />
          </View>
        </View>
      ))}
    </>
  );
}

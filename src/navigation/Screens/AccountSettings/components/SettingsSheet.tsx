import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { Input, Button } from "components";
import { forwardRef, useCallback, Ref } from "react";
import { Keyboard, View } from "react-native";
import useSaveUserSettings from "../hooks/useSaveUserSettings";
import styles from "../styles";
import { Colors } from "constants/styles";

interface SettingsSheetProps {
  option: "NAME" | "ADDRESS" | "PHONE_NUMBER" | "SURNAME" | "";
  text: string;
  setText: (text: string) => void;
  onSheetClose: () => void;
}

const SettingsSheet = forwardRef(
  (props: SettingsSheetProps, ref: Ref<BottomSheet>) => {
    const { onSave } = useSaveUserSettings(props.onSheetClose);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0.75}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        backgroundStyle={{ backgroundColor: Colors.primary }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        enablePanDownToClose
        snapPoints={["50%"]}
        onClose={() => Keyboard.dismiss()}
        backdropComponent={renderBackdrop}
      >
        <Input
          style={{ width: "100%" }}
          value={props.text}
          onChangeText={props.setText}
          placeholder={props.option.toLowerCase().replace("_", " ")}
          keyboardType={
            props.option === "PHONE_NUMBER" ? "phone-pad" : undefined
          }
          maxLength={props.option === "PHONE_NUMBER" ? 9 : undefined}
        />
        <View style={{ width: "100%", alignItems: "center" }}>
          <Button
            variant="primary"
            type="text"
            text={`Save ${props.option.toLowerCase().replace("_", " ")}`}
            fontStyle={{ color: Colors.secondary }}
            style={styles.button}
            disabled={!props.text.trim()}
            onPress={() => onSave(props.option.toLowerCase(), props.text)}
          />
        </View>
      </BottomSheet>
    );
  }
);

export default SettingsSheet;

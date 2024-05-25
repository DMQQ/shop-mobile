import { Button } from "components";
import { useNavigation } from "@react-navigation/native";
import type { useNavigationProps } from "/@types/types";
import { useBottomSheet } from "@gorhom/bottom-sheet";

export default function Navigators({
  onDismiss,
  prod_id,
}: {
  onDismiss?: () => void;
  prod_id: number;
}) {
  const navigation = useNavigation<useNavigationProps>();

  const sheet = useBottomSheet();

  return (
    <>
      <Button text="Back" style={{ width: "25%" }} onPress={onDismiss} />
      <Button
        onPress={() => {
          navigation.navigate("Cart", {
            scrollToProductOnOpen: true,
            selectedProductId: prod_id, // this is the reason that shared animation is not working for cart products
            sharedID: "Cart",
            prod_id,
          });
          sheet.close();
        }}
        style={{ width: "70%", borderRadius: 100 }}
        text="Go to cart"
        type="contained"
        size="xl"
        color="primary"
      />
    </>
  );
}

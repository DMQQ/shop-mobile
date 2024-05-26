import { View } from "react-native";
import { Button } from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "utils/hooks/hooks";
import { RootStackParams, useNavigationProps } from "/@types/types";
import { useNavigation } from "@react-navigation/core";
import styles from "./Sidebar.styles";
import { Fonts } from "constants/styles";
import SignOut from "modules/Signout";

export default function NavigationButtons() {
  const { cart, watchlist, user } = useAppSelector((state) => state);
  const navigation = useNavigation<useNavigationProps>();

  const NavigationButton = (props: {
    screen: any;
    icon: any;
    count?: number;
    text: string;
  }) => (
    <Button
      icon={props.icon}
      style={[styles.button]}
      fontStyle={{
        color: "#fff",
        fontSize: 19,
      }}
      text={props.text}
      onPress={() => navigation.navigate(props.screen)}
      {...(props.count && { badge: props.count })}
    />
  );

  const Icon = (props: { name: string; color?: string }) => (
    <AntDesign
      name={props.name as any}
      style={{ marginRight: 10 }}
      size={25}
      color={props.color || "#fff"}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <NavigationButton
        screen="Watchlist"
        text="Watchlist"
        count={watchlist.data.length}
        icon={<Icon name="heart" />}
      />

      <NavigationButton
        screen="Cart"
        icon={<Icon name="shoppingcart" />}
        text="Cart"
        count={cart.cart.length}
      />

      <NavigationButton
        screen="PurchaseHistory"
        icon={<Icon name="profile" />}
        text="Orders history"
      />

      <NavigationButton
        screen="AccountSettings"
        icon={<Icon name="setting" />}
        text="Account settings"
      />

      <NavigationButton
        screen="MyReviews"
        icon={<Icon name="star" />}
        text="My reviews"
      />
      {/* {user.role === "developer" && ( */}
      <NavigationButton
        screen="Upload"
        icon={<Icon name="cloudupload" />}
        text="Upload product"
      />
      {/* )} */}

      <SignOut />
    </View>
  );
}

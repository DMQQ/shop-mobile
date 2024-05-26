import { View } from "react-native";
import styles from "../styles";
import AddWatchlist from "modules/AddWatchlist";
import { Button } from "components";
import useCart from "modules/Cart/AddToCart/useAddCart";
import { Cart } from "redux/Cart";
import { useNavigation } from "@react-navigation/native";
import CartIcon from "modules/Cart/AddToCart/CartIcon";

export default function ButtonsBar(props: { product?: Cart; prod_id: number }) {
  const {
    pushToCart: addCart,
    result,
    loading,
    error,
  } = useCart(props.prod_id || 0);

  const navigation = useNavigation<any>();

  return (
    <View
      style={[styles.row, { marginTop: 10, zIndex: 5, alignItems: "stretch" }]}
    >
      <AddWatchlist prod_id={props.prod_id} />
      <Button
        disabled={loading}
        icon={<CartIcon loading={loading} success={result} error={!!error} />}
        onLongPress={() => navigation.navigate("Cart")}
        fontStyle={{ textTransform: "uppercase", fontSize: 16, marginLeft: 10 }}
        style={styles.button}
        callback={addCart}
        text={
          !!result ? `Product added (${props.product?.ammount})` : "Add to cart"
        }
        color="primary"
        type="contained"
      />
    </View>
  );
}

import { ProductMinified } from "/@types/types";
import { View, VirtualizedList } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import useFetch from "utils/hooks/useFetch";
import Product from "modules/Product";
import { Button } from "components";

import { FontAwesome5 } from "@expo/vector-icons";
import useWatchlist from "utils/hooks/useWatchlist";
import { useDispatch } from "react-redux";
import { useAppSelector } from "utils/hooks/hooks";
import { watchlistActions } from "redux/Watchlist/Watchlist";

import Animated from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

const init = {
  hasMore: false,
  results: [],
};

interface FetchProps {
  hasMore: boolean;
  results: ProductMinified[];
}

export default function Watchlist() {
  const { theme } = useColorTheme();
  const dispatch = useDispatch();
  const { data } = useAppSelector((state) => state.watchlist);

  const isFocused = useIsFocused();

  useFetch<FetchProps>("/watchlist", {
    invalidate: [isFocused],
    onSuccess: (data = init) => {
      dispatch(watchlistActions.setWatchlist(data));
    },
    onError: (err) => {
      console.warn(err);
    },
  });

  const { remove } = useWatchlist(-1, { withCheck: false });

  async function onRemove(id: number) {
    try {
      await remove(id);
      dispatch(watchlistActions.removeElement(id));
    } catch (error) {}
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <VirtualizedList
        data={data}
        initialNumToRender={4}
        keyExtractor={({ prod_id }: ProductMinified) => prod_id.toString()}
        getItem={(data, key) => data[key] as ProductMinified}
        getItemCount={(d) => d.length}
        renderItem={({ item, index }) => {
          return (
            <Animated.View style={{ marginBottom: 20, position: "relative" }}>
              <Product
                {...item}
                sharedID="Favs"
                fullSize
                hide
                price={+item.price}
              />
              <Button
                rippleColor="white"
                icon={
                  <FontAwesome5 name="heart-broken" size={24} color="white" />
                }
                onPress={() => onRemove(item.prod_id)}
                variant="primary"
                style={{
                  justifyContent: "center",
                  position: "absolute",
                  right: 15,
                  bottom: 15,
                  borderRadius: 100,
                }}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

import { Button } from "components";
import useWatchlist from "./useWatchlist";
import Icon from "./Icon";

import { StyleProp, ViewStyle } from "react-native";

interface AddWatchlistProps {
  prod_id: number;
  paddingHorizontal?: number;

  style?: StyleProp<ViewStyle>;

  iconColor?: string;
  iconSize?: number;
}

export default function AddWatchlist({
  prod_id,
  paddingHorizontal = 15,
  style,
  iconColor,
  iconSize,
}: AddWatchlistProps) {
  const { appendWatchlist, state, remove } = useWatchlist(prod_id, {
    withCheck: true,
  });

  const handleWatchlistClick = () =>
    state === "IN" ? remove(prod_id) : appendWatchlist();

  return (
    <Button
      style={[
        {
          padding: 15,
          marginRight: 10,
          paddingHorizontal,
        },
        style,
      ]}
      type="contained"
      color="primary"
      onPress={handleWatchlistClick}
      icon={<Icon iconSize={iconSize} state={state} iconColor={iconColor} />}
    />
  );
}

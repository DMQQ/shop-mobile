import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { useAppDispatch } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";
import { Colors } from "constants/styles";
import { useNavigationProps } from "/@types/types";

interface CategoryProps {
  category: string;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary_light,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    marginRight: 0,
    borderRadius: 10,
  },
  text: { color: "#fff" },
});

export default function Category({ category }: CategoryProps) {
  const navigation = useNavigation<useNavigationProps>();

  const dispatch = useAppDispatch();

  async function onPress() {
    dispatch(searchActions.setFilter({ key: "category", value: category }));

    navigation.navigate("Search", {});
  }
  return (
    <Ripple rippleColor="white" onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{category}</Text>
    </Ripple>
  );
}

import React from "react";
import { View, Dimensions, StyleProp, ViewStyle } from "react-native";
import Button from "@components/Button/Button";
import { ProductRatingProps, useNavigationProps } from "/@types/types";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@constants/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface DetailsButtonsProps {
  name: string;
  thumbnail: string;
  sharedID: string;
  prod_id: number;
  reviews?: ProductRatingProps[];
}

const buttonStyle: StyleProp<ViewStyle> = {
  width: "45%",
  justifyContent: "center",
  backgroundColor: Colors.primary100,
};

export default function ProductDetailsButtons({
  name,
  thumbnail,
  sharedID,
  prod_id,
  reviews,
}: DetailsButtonsProps) {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        justifyContent: "space-around",
        marginBottom: 20,
        flexDirection: "row",
      }}
    >
      <Button
        text="Create review"
        variant="primary"
        style={buttonStyle}
        callback={() =>
          navigation.navigate("CreateReview", {
            thumbnail,
            prod_id,
            prod_name: name,
            sharedID,
          })
        }
      />
      <Button
        variant="primary"
        text="Reviews"
        style={buttonStyle}
        callback={() =>
          navigation.navigate("ProductReviews", {
            prod_id,
            prod_name: name,
            reviews: reviews || [],
            sharedID,
          })
        }
      />
    </View>
  );
}
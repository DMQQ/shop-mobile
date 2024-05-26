import { View } from "react-native";
import styles from "../styles";
import { ThemedText } from "components";
import { Fonts } from "constants/styles";
import useColorTheme from "utils/context/ThemeContext";
import { Stars } from "@components/Stars/Stars";

export default function RatingBar(props: {
  ratings: number;
  reviewsCount?: number;
}) {
  const { theme } = useColorTheme();
  return (
    <View
      style={[styles.row, { width: "100%", justifyContent: "space-between" }]}
    >
      <ThemedText
        style={{
          color: theme.textFaded,
          fontSize: 17,
          fontFamily: Fonts.PoppinsRegular,
          marginLeft: 5,
        }}
      >
        Based on ({props.reviewsCount}) reviews
      </ThemedText>
      <Stars
        rating={props.ratings}
        starStyle={{
          marginTop: 0,
          marginLeft: -5,
          width: 100,
          padding: 0,
          transform: [
            {
              scale: 0.5,
            },
          ],
        }}
      />
    </View>
  );
}

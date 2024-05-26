import { ProductRatingProps } from "/@types/types";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  useWindowDimensions,
} from "react-native";
import { Colors } from "../../constants/styles";
import { Stars } from "@components/Stars/Stars";
import Color from "color";

const { width } = Dimensions.get("screen");

export default function Ratings({
  rating,
  title,
  description,
}: Omit<ProductRatingProps, "user_id">) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width: width - 20 }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>Jan Kowalski</Text>
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.text, { fontSize: 25, fontWeight: "bold" }]}>
          {title}
        </Text>

        <Text style={styles.text}>{description}</Text>
      </View>

      <View style={{ width: "100%", alignItems: "center" }}>
        <Stars
          rating={rating}
          starStyle={{ transform: [{ scale: 0.5 }], padding: 0, width: 100 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "100%",
    backgroundColor: Color(Colors.primary_light).lighten(0.15).string(),
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  header: {
    marginBottom: 10,
    flexDirection: "row",
  },
  text: {
    color: "#e3e3e3",
    fontSize: 20,
  },
  slider: {
    width: width - 20, // padding
    height: 250,
  },
});

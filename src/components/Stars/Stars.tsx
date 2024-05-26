import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useEffect } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const init: any[] = new Array(5).fill({ value: 0 });

interface StarsProps {
  rating?: number | undefined;
  setRating: (v: number) => void;
}

function CalcResult(start: any[]) {
  const numbers = start.map(({ value }) => value);
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

export default function StarsTouch({ setRating }: StarsProps) {
  const [start, setStart] = useState(init);

  useEffect(() => {
    setRating(CalcResult(start));
  }, [start]);

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {start.map(({ value }, index) => {
          const rate = () => {
            const arr = [];
            for (let i = 0; i < start.length; i++) {
              arr.push({ value: i <= index ? 1 : 0 });
            }
            setStart(arr);
          };
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={rate}
              style={{ padding: 5 }}
            >
              <AntDesign
                name="star"
                size={30}
                color={value === 1 ? "yellow" : "grey"}
              />
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
}

type TStarsProps = {
  rating: number;
  starStyle?: any;
};

export const Stars = ({ rating, starStyle = {} }: TStarsProps) => {
  const [start] = useState(() => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push({ value: i < rating ? 1 : 0 });
    }
    return arr;
  });
  return (
    <View style={[styles.container, starStyle]}>
      <View style={styles.stars}>
        {start.map(({ value }, index) => {
          return (
            <TouchableWithoutFeedback key={index} style={{ padding: 5 }}>
              <AntDesign
                name="star"
                size={30}
                color={value === 1 ? "yellow" : "grey"}
              />
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  stars: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

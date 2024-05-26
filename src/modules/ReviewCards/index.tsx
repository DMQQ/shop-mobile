import Color from "color";
import layout from "constants/layout";
import { Colors, Fonts } from "constants/styles";
import { Stars } from "@components/Stars/Stars";
import { View, Text, Image } from "react-native";
import Animated, {
  Extrapolate,
  FadeIn,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const TEST_LIST = Array.from(new Array(10).keys());
const TILE_CONTAINER_HEIGHT = 180;
const TILE_WIDTH = layout.screen.width * 0.7 + 5;
const TILE_HEIGHT = TILE_CONTAINER_HEIGHT - 20;

const TILE_GAP = 5;

export default function ReviewCards() {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll(event) {
      scrollX.value = event.contentOffset.x;
    },
  });

  const calculateSnapOffsets = () => {
    const snapOffsets = TEST_LIST.map((_, index) => {
      const offset = index * (TILE_WIDTH + TILE_GAP);
      const centerOffset =
        offset - (layout.window.width - TILE_WIDTH - TILE_GAP) / 2;
      return centerOffset;
    });
    return snapOffsets;
  };

  return (
    <View
      style={{
        width: "100%",
        height: TILE_CONTAINER_HEIGHT,
        padding: TILE_GAP,
      }}
    >
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        snapToOffsets={calculateSnapOffsets()}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={onScroll}
        horizontal
        data={TEST_LIST}
        keyExtractor={(element) => element.toString()}
        renderItem={({ item, index }) => (
          <AnimatedTileComponent scrollX={scrollX} index={index} />
        )}
      />
    </View>
  );
}

const ACTIVE_COLOR = Color(Colors.primary).lighten(0.75).hex();
const NOT_ACTIVE_COLOR = Color(Colors.primary).lighten(0.25).hex();

const AnimatedTileComponent = ({
  index: i,
  scrollX,
}: {
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const width = TILE_WIDTH;

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1.05, 0.9],
            Extrapolate.CLAMP
          ),
        },
      ],
      backgroundColor: interpolateColor(scrollX.value, inputRange, [
        NOT_ACTIVE_COLOR,
        ACTIVE_COLOR,
        NOT_ACTIVE_COLOR,
      ]),
      borderRadius: interpolate(scrollX.value, inputRange, [10, 15, 10]),
    };
  });

  return (
    <Animated.View
      layout={FadeIn}
      style={[
        {
          width: TILE_WIDTH,
          height: TILE_HEIGHT,
          marginLeft: TILE_GAP / 2,
          marginRight: TILE_GAP / 2,
          borderRadius: 10,
          padding: 15,
          justifyContent: "space-between",
        },
        animatedStyle,
      ]}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 25,
          fontFamily: Fonts.PoppinsBold,
          textAlign: "center",
        }}
      >
        Card title
      </Text>
      <Text style={{ color: "#fff", marginTop: 5, textAlign: "center" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam
        necessitatibus
      </Text>

      <Stars
        rating={4}
        starStyle={{
          transform: [{ scale: 0.5 }],

          padding: 0,
        }}
      />
    </Animated.View>
  );
};

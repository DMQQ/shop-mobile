import { SkeletonPlaceholder } from "@components/index";
import { View } from "react-native";

export default function Placeholder() {
  const height = 75 * 1.3 + 25;
  return (
    <SkeletonPlaceholder
      size={({ width }) => ({ width, height })}
      backgroundColor={"#1f2b3d"}
      highlightColor={"#2a3a52"}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <SkeletonPlaceholder.Item
          margin={10}
          width={(w) => w - 20}
          height={height}
        />
      </View>
    </SkeletonPlaceholder>
  );
}

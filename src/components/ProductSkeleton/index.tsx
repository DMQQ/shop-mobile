import { SkeletonPlaceholder } from "components";
import { useWindowDimensions, View } from "react-native";

interface SkeletonProps {}

export default function ProductSkeleton({}: SkeletonProps) {
  const { width } = useWindowDimensions();
  return (
    <SkeletonPlaceholder
      backgroundColor={"#1f2b3d"}
      highlightColor={"#2a3a52"}
      size={{ width, height: 260 }}
    >
      <View style={{ width, height: 260, marginTop: 0, alignItems: "center" }}>
        <SkeletonPlaceholder.Item height={250} width={width - 20} />
      </View>
    </SkeletonPlaceholder>
  );
}

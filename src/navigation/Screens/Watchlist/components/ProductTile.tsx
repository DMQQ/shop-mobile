import { ProductMinified, useNavigationProps } from "/@types/types";
import layout from "constants/layout";
import { image } from "functions/image";
import { View, Image, Pressable } from "react-native";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";

interface ProductTileProps {
  product: ProductMinified;

  listIndex: number;

  onPress: () => void;

  isExpanded: boolean;
}

const TILES_PER_ROW = 2;

const TILE_GAP = 5;

export const TILE_WIDTH = layout.screen.width / TILES_PER_ROW - TILE_GAP * 2;

export default function ProductTile({
  product,
  listIndex,
  isExpanded,
  onPress,
}: ProductTileProps) {
  const thumbnail = image(product.images);

  return (
    <Animated.View style={{ marginBottom: 10 }}>
      <Ripple
        onPress={onPress}
        //  onLongPress={() => setShowControls((p) => !p)}
      >
        <Image
          resizeMode="contain"
          style={{
            width: isExpanded ? TILE_WIDTH * 2 + TILE_GAP * 2 : TILE_WIDTH,
            height: isExpanded ? TILE_WIDTH * 1.1 : TILE_WIDTH * 1.3,
            borderRadius: 5,
          }}
          source={thumbnail}
        />
      </Ripple>
    </Animated.View>
  );
}

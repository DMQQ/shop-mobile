import layout from "constants/layout";
import { image } from "functions/image";
import { Image, Pressable, Text } from "react-native";
import { ProductMinified } from "/@types/types";

const tileGap = 2.5;
const tileWidth = Math.trunc(layout.screen.width / 2 - tileGap * 4);

interface TileProps {
  setSelectedTile: (tileId: ProductMinified) => void;

  product: ProductMinified;
}

export default function Tile({ setSelectedTile, product }: TileProps) {
  function handleLongPress() {
    setSelectedTile(product);
  }

  return (
    <Pressable
      onLongPress={handleLongPress}
      style={{
        width: tileWidth,
        height: tileWidth,
        backgroundColor: "red",
        marginBottom: tileGap,
        justifyContent: "center",
        alignItems: "center",
        margin: 2.5,
        // borderRadius: 5,
      }}
    >
      <Image
        source={image(product.images)}
        style={{ width: tileWidth, height: tileWidth }}
        resizeMode="cover"
      />
    </Pressable>
  );
}

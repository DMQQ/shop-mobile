import { FlatList, Image, Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import type { ProductMinified, useNavigationProps } from "/@types/types";
import { image } from "functions/image";
import { Fonts } from "constants/styles";
import { useMemo } from "react";
import { SharedElement } from "react-navigation-shared-element";

interface SuggestionProps {
  text?: string;
  data: ProductMinified[];
}

export default function ProductSuggestion({
  text: productTitle = "",
  data,
}: SuggestionProps) {
  // const { data } = useQuerySuggestions(productTitle);

  const navigation = useNavigation<useNavigationProps>();

  function navigateProduct(item: ProductMinified) {
    navigation.push("Product", {
      image: image(item.images).uri,
      title: item.title,
      prod_id: item.prod_id,
      sharedID: "Details",
      isSharedAnimationUsed: true,
    });
  }

  const filteredProducts = useMemo(
    () => data?.filter(({ title }) => title !== productTitle),
    [data]
  );

  const hasMoreThanOne = typeof data !== "undefined" && data.length > 1;

  return hasMoreThanOne ? (
    <>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          paddingLeft: 10,
          fontFamily: Fonts.PoppinsBold,
        }}
      >
        Check these out
      </Text>
      <FlatList
        data={filteredProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ padding: 5, marginBottom: 10 }}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        renderItem={({ item, index }) => (
          <Ripple
            onPress={() => navigateProduct(item)}
            style={{ marginRight: 10, marginLeft: index === 0 ? 8 : 0 }}
          >
            <Image
              style={{
                width: 170,
                height: 100,
                borderRadius: 7.5,
              }}
              resizeMode="contain"
              source={image(item.images)}
            />
          </Ripple>
        )}
      />
    </>
  ) : null;
}

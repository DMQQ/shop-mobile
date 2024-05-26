import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";
import Header from "./components/Header";
import Loader from "./components/Loader";
import useDailySale from "./hooks/useDailySale";
import { image } from "functions/image";
import { useAppSelector } from "utils/hooks/hooks";
import Headings from "./components/Headings";
import RatingBar from "./components/Ratingbar";
import ButtonsBar from "./components/Buttonsbar";
import ImagesCarusel from "@components/ImagesCarusel/ImagesCarusel";

import Taglist from "@components/Taglist/Taglist";

import tags from "@navigation/Screens/ProductDetails/components/tags";

export default function DailySale() {
  const { data: sale, loading } = useDailySale();
  const data = sale?.sale;
  const navigation = useNavigation<useNavigationProps>();
  const isLoaderPresent = loading || !data;
  const { cart } = useAppSelector((st) => st.cart);
  const imgSrc = image(data?.images?.[0]?.name);

  function toProduct(imgIndex: number) {
    data?.prod_id &&
      navigation.navigate("Product", {
        image: imgSrc.uri,
        prod_id: data?.prod_id,
        sharedID: "DAILY",
        title: data?.title,
        isSharedAnimationUsed: imgIndex === 0,
      });
  }

  const product = cart.find((p) => p.prod_id === data?.prod_id);

  return (
    <View style={styles.container}>
      <Header />
      {!isLoaderPresent ? (
        <View>
          <ImagesCarusel
            onPress={toProduct}
            prod_id={data.prod_id}
            sharedID="DAILY"
            images={data.images}

            //  isSharedAnimationUsed
          />

          <View style={[styles.details, { marginTop: 10 }]}>
            <Headings.Title text={data?.title} />

            <View style={styles.bottom_tab}>
              <Headings.Price price={data.price} quantity={data.quantity} />

              <RatingBar
                ratings={data.rating}
                reviewsCount={data.reviewsCount}
              />

              <Taglist tagsList={tags} />

              <ButtonsBar prod_id={data.prod_id} product={product} />
            </View>
          </View>
        </View>
      ) : (
        <Loader />
      )}
    </View>
  );
}

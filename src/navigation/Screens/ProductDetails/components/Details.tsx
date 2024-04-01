import React from "react";
import { Text } from "react-native";
import styles from "./details.styles";
import { Stars } from "modules/Stars/Stars";
import ReviewButtons from "./ReviewButtons";
import type { DetailsProps, ProductRatingProps } from "/@types/types";
import DetailRow from "./DetailRow";
import { Skeleton } from "./Loaders";
import Taglist from "components/Taglist/Taglist";
import tags from "./tags";
import SellerTile from "./SellerTile";
import Animated, { FadeInDown } from "react-native-reanimated";

interface IDetailsProps extends Omit<DetailsProps, "ratings"> {
  showPrice?: boolean;
  ratings?: ProductRatingProps[];
  manufacturer?: string;
  isLoading?: boolean;
}

export default function Details({
  showPrice = true,
  ratings = [],
  isLoading,
  ...props
}: Partial<IDetailsProps>) {
  if (isLoading) return <Skeleton />;

  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      {/* <Title title={props!.title || ""} /> */}

      <Text style={[styles.text, { marginBottom: 5, paddingVertical: 5 }]}>
        {props.title}
      </Text>

      <SellerTile
        seller={{
          name: props?.manufacturer || "",
          image: props?.image || "",
        }}
      />

      <DetailRow
        containerStyle={{ paddingBottom: 5 }}
        buttonText="See more"
        children={<Stars rating={props.rating || 0} starStyle={styles.stars} />}
      />

      {showPrice && (
        <DetailRow
          buttonText="See more"
          children={<Text style={[styles.text]}>${props.price}</Text>}
        />
      )}

      <Taglist tagsList={tags} />

      <ReviewButtons
        thumbnail={props.image!}
        prod_id={props.prod_id!}
        sharedID={props.sharedID!}
        reviews={ratings}
        name={props.title!}
      />

      {/* <Description description={props!.description as string} /> */}

      <Text style={styles.description}>{props.description}</Text>
    </Animated.View>
  );
}

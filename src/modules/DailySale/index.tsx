import React from "react";
import { View, Text, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ProductTypeProps } from "../Product";
import styles from "./styles";
import { API } from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "../../@types/types";
import { Button } from "../../components";
import Clock from "components/Clock";
import useCart from "modules/AddToCart/useCart";
import Ripple from "react-native-material-ripple";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";
import Loader from "./Loader";

const GET_DAILY = gql`
  query {
    sale {
      prod_id
      title
      price
      img_id {
        name
      }
    }
  }
`;

export default function DailySale() {
  const { user } = useUser();

  const { data = {} as ProductTypeProps, loading } = useQuery(GET_DAILY, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  console.log(data);

  const navigation = useNavigation<useNavigationProps>();

  function toProduct() {
    if (data?.sale?.prod_id) {
      navigation.navigate("Details", {
        image: `${API}/upload/images=${data?.sale?.img_id[0]?.name}`,
        prod_id: data?.sale?.prod_id,
        sharedID: "DAILY",
        title: data?.sale?.title,
      });
    }
  }

  const { pushToCart, result } = useCart(data?.sale?.prod_id);

  return (
    <View style={styles.container}>
      {!loading && data.sale && (
        <>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <Text style={styles.title}>Promotion</Text>
            <Clock />
          </View>
          <Ripple onPress={toProduct}>
            <SharedElement
              id={`prod_id.${data?.sale?.prod_id}DAILY`}
              style={styles.image_container}
            >
              <Image
                style={[styles.image]}
                resizeMode="cover"
                source={{
                  uri: `${API}/upload/images=${data?.sale?.img_id?.[0]?.name}`,
                }}
              />
            </SharedElement>
          </Ripple>
          <View style={[styles.details]}>
            <Text style={{ color: "#fff", fontSize: 20, marginBottom: 5 }}>
              {data?.sale?.title}
            </Text>
            <View
              style={[
                styles.row,
                { width: "100%", justifyContent: "space-between" },
              ]}
            >
              <View style={styles.row}>
                <Text style={styles.price}>${data?.sale?.price}</Text>
                <Text style={styles.discounted}>
                  ${Math.ceil(data?.sale?.price * 1.25)}
                </Text>
              </View>
              <Button
                onPress={() => pushToCart()}
                text={!!result ? "Added" : "Add to cart"}
                variant="ternary"
              />
            </View>
          </View>
        </>
      )}

      {loading && !data.sale && <Loader />}
    </View>
  );
}

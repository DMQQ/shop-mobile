import { useEffect, useState } from "react";
import * as Font from "expo-font";
import useCheckToken from "./useCheckToken";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useApolloClient } from "@apollo/client";
import { GET_SALE } from "@navigation/Screens/Home/components/DailySale/hooks/useDailySale";
import { hideAsync } from "expo-splash-screen";

export default function useLoadApp() {
  const [appReady, setAppReady] = useState(false);
  const { loadUser } = useCheckToken();
  const apollo = useApolloClient();

  useEffect(() => {
    async function prepare() {
      try {
        const usr = await loadUser();

        await Font.loadAsync({
          PoppinsBold: require("../../../assets/fonts/Poppins-Bold.ttf"),
          PoppinsThin: require("../../../assets/fonts/Poppins-Thin.ttf"),
          PoppinsMedium: require("../../../assets/fonts/Poppins-Medium.ttf"),
          PoppinsRegular: require("../../../assets/fonts/Poppins-Regular.ttf"),
          PoppinsLight: require("../../../assets/fonts/Poppins-Light.ttf"),
          PoppinsBlack: require("../../../assets/fonts/Poppins-Black.ttf"),
          ...EvilIcons.font,
          ...MaterialCommunityIcons.font,
        });

        if (usr?.token)
          try {
            await apollo.query({
              query: GET_SALE,
              context: { headers: { token: usr.token } },
            });
          } catch (error) {}
      } catch (error) {
        console.warn(error);
      } finally {
        setAppReady(true);
        hideAsync();
      }
    }
    prepare();
  }, []);

  return [appReady, setAppReady];
}

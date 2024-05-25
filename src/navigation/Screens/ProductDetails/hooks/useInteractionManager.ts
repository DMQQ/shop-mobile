import { useApolloClient } from "@apollo/client";
import { Product } from "/@types/types";
import { useEffect, useState } from "react";
import { GET_PRODUCT } from "./schema";
import { InteractionManager } from "react-native";

export default function useInteractionManager(
  navigation: any,
  prod_id: number,
  title: string
) {
  const [isQuerySkipped, setIsQuerySkipped] = useState(false);

  const client = useApolloClient();

  const cachedProduct = client.readQuery<Product>({
    query: GET_PRODUCT,
    variables: {
      prod_id,
      name: title.split(" ").slice(0, 2).join(" "),
    },
  });

  useEffect(() => {
    if (!cachedProduct) {
      const unsubscribe = navigation.addListener("focus", () => {
        const interactionHandle = InteractionManager.runAfterInteractions(
          () => {
            setIsQuerySkipped(false);
          }
        );

        return () => {
          interactionHandle.cancel(); // Clean up the interaction handle if the component unmounts
        };
      });

      return unsubscribe;
    } else {
      // If data is cached, set animation as complete immediately

      setIsQuerySkipped(false);
    }
  }, [navigation, cachedProduct]);

  return isQuerySkipped;
}

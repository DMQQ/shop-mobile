import { gql, useQuery } from "@apollo/client";
import { useUser } from "@utils/context/UserContext";
import { useCallback, useState } from "react";
import { Product } from "/@types/types";

interface Prods {
  history_id?: number;
  prod_id?: Product;
}

export interface IHistory {
  date?: string;
  payment_id?: string;
  total_price?: number;
  status?: string;

  products: Prods[];
}

const GET_HISTORY = gql`
  query History($skip: Int) {
    history(skip: $skip) {
      date
      payment_id
      total_price
      products {
        history_id
        prod_id {
          prod_id
          price
          title
          images(take: 1) {
            id
            name
          }
        }
      }
    }
  }
`;

export default function usePurchaseHistory() {
  const { user } = useUser();

  const [skip, setSkip] = useState(5);

  const onEndReached = useCallback(async () => {
    await fetchMore({
      variables: { skip },
    });
    setSkip((prev) => prev + 5);
  }, [skip]);

  const [refreshing, setRefreshing] = useState(false);

  const onPullToRefresh = useCallback(async () => {
    setRefreshing(true);

    await fetchMore({
      variables: { skip: 0, refreshing: true },
    });

    setRefreshing(false);
  }, []);

  const { data, loading, fetchMore } = useQuery<{
    history: IHistory[];
  }>(GET_HISTORY, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  return { data, loading, onEndReached, onPullToRefresh, refreshing };
}

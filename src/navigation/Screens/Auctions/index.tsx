import { Auction, ScreenNavigationProps } from "/@types/types";
import { Container } from "components";
import Header from "./components/Header";
import useGetPendingAuctions from "./hooks/useGetAuctions";
import { VirtualizedList, LogBox } from "react-native";
import Card from "./components/Card";
import { useCallback, useState } from "react";
import RemoveProductsRepetition from "functions/RemoveRepetition";

export default function Auctions({
  navigation,
}: Required<ScreenNavigationProps<"Auctions">>) {
  const [skip, setSkip] = useState(5);
  const { data, fetchMore, loading } = useGetPendingAuctions();

  const onEndReached = useCallback(async () => {
    fetchMore({
      variables: { skip },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          auctions: RemoveProductsRepetition(
            [...prev.auctions, ...fetchMoreResult.auctions],
            "auction_id"
          ),
        };
      },
    });

    setSkip((prev) => prev + 5);
  }, [skip]);

  return (
    <Container>
      <Header />

      <VirtualizedList
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        data={(data?.auctions as Auction[]) || []}
        initialNumToRender={5}
        getItem={(data, index) => data[index] as Required<Auction>}
        getItemCount={(d) => d.length}
        keyExtractor={({ auction_id }) => auction_id}
        renderItem={({ item }: { item: Required<Auction> }) => (
          <Card
            {...item}
            navigation={navigation}
            product={{
              ...item.product,
              category: item.product.category as string,
            }}
          />
        )}
      />
    </Container>
  );
}

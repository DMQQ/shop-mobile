import { ScreenNavigationProps } from "/@types/types";
import { ScrollView, View } from "react-native";
import { Colors } from "constants/styles";
import { useAddBid, useGetAuction } from "./hooks";
import Bid from "./components/Bid";
import BidList from "./components/Bid_list";
import useBoolean from "utils/hooks/useBoolean";
import Addbid from "./components/Add_bid";
import Details from "../ProductDetails/components/Details";
import { API } from "constants/routes";
import ImagesCarusel from "../../../components/ImagesCarusel/ImagesCarusel";
import { SkeletonPlaceholder } from "components";
import { useEffect } from "react";

export default function AuctionScreen({
  route,
  navigation,
}: Required<ScreenNavigationProps<"Auction">>) {
  const { data, loading } = useGetAuction(route.params.auction_id);
  const [addBid, { loading: isBidLoading }] = useAddBid();
  const { state, toggle } = useBoolean();

  useEffect(() => {
    if (!!data?.auction)
      navigation.setOptions({ title: data.auction.product?.title });
  }, [data?.auction]);

  function onBid(amount: number, auction_id: string) {
    return addBid({
      variables: {
        auction_id,
        amount,
      },
    });
  }

  return (
    <ScrollView
      style={{ backgroundColor: Colors.primary, flex: 1, position: "relative" }}
    >
      {loading ? (
        <SkeletonPlaceholder>
          <View style={{ flex: 1, alignItems: "center" }}>
            <SkeletonPlaceholder.Item height={300} width={(w) => w - 20} />
            <SkeletonPlaceholder.Item height={200} width={(w) => w - 20} />
            <SkeletonPlaceholder.Item height={200} width={(w) => w - 20} />
          </View>
        </SkeletonPlaceholder>
      ) : (
        <>
          <ImagesCarusel
            images={data?.auction?.product?.images! || []}
            sharedID="Auction"
            prod_id={data?.auction?.product?.prod_id || 0}
          />
          {data?.auction?.bids && (
            <>
              <Bid
                showLabel
                bid={data?.auction?.bids[0] ?? { amount: 0 }}
                onOpenModal={toggle}
              />
              <BidList
                onCloseModal={toggle}
                bids={data?.auction.bids}
                isPresent={state}
              />
              <Addbid
                isLoading={isBidLoading}
                highest={data?.auction.bids?.[0]?.amount || 0}
                auction_id={route.params.auction_id}
                onBid={onBid}
              />
            </>
          )}

          <Details
            showPrice={false}
            image={`${API}/upload/image=${data?.auction?.product?.images[0]?.name}`}
            {...(data?.auction?.product as any)}
          />
        </>
      )}
    </ScrollView>
  );
}

import { AuctionBid } from "/@types/types";
import { FlatList, Text } from "react-native";
import Bid from "./Bid";
import { Modal } from "components";
import { Fonts } from "constants/styles";

interface BidListProps {
  isPresent: boolean;
  bids: AuctionBid[];

  onCloseModal: () => void;
}

export default function BidList({
  isPresent,
  bids,
  onCloseModal,
}: BidListProps) {
  return (
    <Modal
      isVisible={isPresent}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
    >
      {bids.length === 0 && (
        <Text
          style={{ fontSize: 25, fontFamily: Fonts.PoppinsBold, color: "#fff" }}
        >
          No bids
        </Text>
      )}
      <FlatList
        data={bids}
        keyExtractor={(item) => item.bid_id}
        renderItem={({ item }) => <Bid bid={item} />}
      />
    </Modal>
  );
}

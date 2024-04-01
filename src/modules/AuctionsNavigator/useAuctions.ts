import { gql, useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";

const GET_AUCTIONS = gql`
  query GetAuctionsPreview {
    auctions(take: 5) {
      auction_id
      product {
        images(take: 1) {
          name
        }
      }
    }
  }
`;

export default function useAuctions() {
  const { user } = useUser();

  return useQuery(GET_AUCTIONS, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}

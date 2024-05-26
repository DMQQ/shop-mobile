import { gql, useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";

const GET_AUCTIONS = gql`
  query GetAuctions($skip: Int!) {
    auctions(skip: $skip, take: 5) {
      auction_id
      bids(take: 1) {
        amount
      }
      product {
        title
        category
        images(take: 1) {
          name
        }
      }
    }
  }
`;

export default function useGetPendingAuctions() {
  const { user } = useUser();

  return useQuery(GET_AUCTIONS, {
    errorPolicy: "ignore",
    variables: { skip: 0 },
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
